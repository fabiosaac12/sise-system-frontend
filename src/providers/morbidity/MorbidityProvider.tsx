import { FC, PropsWithChildren, useState } from "react";
import { MorbidityContext } from "./MorbidityContext";
import {
  Morbidity,
  MorbidityFilter,
  MorbidityForTable,
  MorbidityState,
  initialMorbidityFilter,
} from "@app/models/morbidity.model";
import { Pagination, initialPagination } from "@app/models/pagination";
import { useRequest } from "@app/hooks/useRequest";
import {
  createMorbidity,
  deleteMorbidity,
  deleteMorbiditys,
  editMorbidity,
  getMorbiditys,
} from "@app/config/api/backend/requests/morbidity";
import { getClientsCatalogue } from "@app/config/api/backend/requests/catalogues";
import { Catalogue } from "@app/models/catalogue.model";

export const MorbidityProvider: FC<PropsWithChildren> = ({ children }) => {
  const [clients, setClients] = useState<Catalogue>([]);
  const [list, setList] = useState<MorbidityForTable[]>();
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [filter, setFilter] = useState<MorbidityFilter>(initialMorbidityFilter);

  const _getClientsCatalogue = useRequest(getClientsCatalogue);
  const _getAll = useRequest(getMorbiditys);
  const _createOne = useRequest(createMorbidity);
  const _editOne = useRequest(editMorbidity);
  const _deleteOne = useRequest(deleteMorbidity);
  const _deleteMany = useRequest(deleteMorbiditys);

  const getClients: MorbidityState["catalogues"]["getClients"] = async () => {
    const catalogue = await _getClientsCatalogue({});

    if (catalogue) {
      setClients(catalogue);

      return catalogue;
    }
  };

  const getAll: MorbidityState["getAll"] = async ({
    filter: _filter,
    pagination: _pagination,
  }: {
    filter?: Partial<MorbidityFilter>;
    pagination?: Partial<Pagination>;
  } = {}) => {
    if (!filter.clientId) {
      setList(undefined);

      return undefined;
    }

    const response = await _getAll({
      filter: { ...filter, ..._filter },
      pagination: { ...pagination, ..._pagination },
    });

    if (response) {
      const { list: Morbiditys, ...pagination } = response;

      setList(Morbiditys);
      setPagination({
        ...pagination,
        totalItems: pagination.totalRows,
      });

      return Morbiditys;
    }
  };

  const createOne: MorbidityState["createOne"] = async (data: Morbidity) => {
    const done = await _createOne({ data });

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const editOne: MorbidityState["editOne"] = async (
    id: string,
    data: Morbidity,
  ) => {
    const done = await _editOne({ data, id });

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const deleteOne: MorbidityState["deleteOne"] = async (id: string) => {
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

  const deleteMany: MorbidityState["deleteMany"] = async (ids: string[]) => {
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

  const applyFilters = (newFilter: Partial<MorbidityFilter>) => {
    setFilter(() => ({
      ...initialMorbidityFilter,
      ...newFilter,
    }));
  };

  const state: MorbidityState = {
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
    catalogues: {
      clients,
      getClients,
    },
  };

  return (
    <MorbidityContext.Provider value={state}>
      {children}
    </MorbidityContext.Provider>
  );
};
