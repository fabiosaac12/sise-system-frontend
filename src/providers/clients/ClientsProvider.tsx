import { FC, PropsWithChildren, useState } from "react";
import { ClientsContext } from "./ClientsContext";
import {
  ClientFilter,
  ClientForTable,
  ClientFormData,
  ClientState,
  initialClientFilter,
} from "@app/models/client.model";
import { Pagination, initialPagination } from "@app/models/pagination";
import { useRequest } from "@app/hooks/useRequest";
import {
  getClients,
  createClient,
  deleteClient,
  deleteClients,
  editClient,
} from "@app/config/api/backend/requests/clients";

export const ClientsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [list, setList] = useState<ClientForTable[]>();
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [filter, setFilter] = useState<ClientFilter>(initialClientFilter);

  const _getAll = useRequest(getClients);
  const _createOne = useRequest(createClient);
  const _editOne = useRequest(editClient);
  const _deleteOne = useRequest(deleteClient);
  const _deleteMany = useRequest(deleteClients);

  const getAll: ClientState["getAll"] = async ({
    filter: _filter,
    pagination: _pagination,
  }: {
    filter?: Partial<ClientFilter>;
    pagination?: Partial<Pagination>;
  } = {}) => {
    const response = await _getAll({
      filter: { ...filter, ..._filter },
      pagination: { ...pagination, ..._pagination },
    });

    if (response) {
      const { list: clients, ...pagination } = response;

      setList(clients);
      setPagination({
        ...pagination,
        totalItems: pagination.totalRows,
      });

      return clients;
    }
  };

  const createOne: ClientState["createOne"] = async (data: ClientFormData) => {
    const done = await _createOne({ data });

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const editOne: ClientState["editOne"] = async (
    id: string,
    data: ClientFormData,
  ) => {
    const done = await _editOne({ data, id });

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const deleteOne: ClientState["deleteOne"] = async (id: string) => {
    const done = await _deleteOne({ id });

    if (done) {
      if (list?.length === 1) {
        await getAll({
          pagination: { currentPage: pagination.currentPage - 1 || 1 },
        });
      } else {
        await getAll();
      }

      return true;
    } else {
      return false;
    }
  };

  const deleteMany: ClientState["deleteMany"] = async (ids: string[]) => {
    const done = await _deleteMany({ ids });

    if (done) {
      if (list?.length === ids.length) {
        await getAll({
          pagination: { currentPage: pagination.currentPage - 1 || 1 },
        });
      } else {
        await getAll();
      }

      return true;
    } else {
      return false;
    }
  };

  const applyFilters = (newFilter: Partial<ClientFilter>) => {
    setFilter(() => ({
      ...initialClientFilter,
      ...newFilter,
    }));
  };

  const state: ClientState = {
    createOne,
    editOne,
    deleteOne,
    deleteMany,
    getAll,
    applyFilters,
    filter,
    list,
    pagination,
    setPagination,
  };

  return (
    <ClientsContext.Provider value={state}>{children}</ClientsContext.Provider>
  );
};
