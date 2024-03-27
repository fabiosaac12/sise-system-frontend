import { FC, PropsWithChildren, useState } from "react";
import { UsersContext } from "./UsersContext";
import {
  UserFilter,
  UserForTable,
  UserFormData,
  UserState,
  initialUserFilter,
} from "@app/models/user.model";
import { Pagination, initialPagination } from "@app/models/pagination";
import { useRequest } from "@app/hooks/useRequest";
import {
  createUser,
  deleteUser,
  deleteUsers,
  editPassword,
  editUser,
  getUsers,
  sendCreateEmail,
  sendEditEmail,
} from "@app/config/api/backend/requests/users";

export const UsersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [list, setList] = useState<UserForTable[]>();
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [filter, setFilter] = useState<UserFilter>(initialUserFilter);

  const _getAll = useRequest(getUsers);
  const _sendCreateEmail = useRequest(sendCreateEmail);
  const _createOne = useRequest(createUser);
  const _deleteOne = useRequest(deleteUser);
  const _deleteMany = useRequest(deleteUsers);
  const _editOne = useRequest(editUser);
  const _sendEditEmail = useRequest(sendEditEmail);
  const _editPassword = useRequest(editPassword);

  const getAll: UserState["getAll"] = async ({
    filter: _filter,
    pagination: _pagination,
  }: {
    filter?: Partial<UserFilter>;
    pagination?: Partial<Pagination>;
  } = {}) => {
    const response = await _getAll({
      filter: {
        ...filter,
        ..._filter,
        email: (_filter?.email || filter.email || undefined) as string,
        firstName: (_filter?.firstName ||
          filter.firstName ||
          undefined) as string,
        lastName: (_filter?.lastName || filter.lastName || undefined) as string,
      },
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

  const sendCreateEmailOne: UserState["sendCreateEmailOne"] = async (
    data: UserFormData,
  ) => {
    const done = await _sendCreateEmail({ data });

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const createOne: UserState["createOne"] = async (password: string) => {
    const done = await _createOne(password);

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const deleteOne: UserState["deleteOne"] = async (id) => {
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

  const deleteMany: UserState["deleteMany"] = async (ids: string[]) => {
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

  const editOne: UserState["editOne"] = async (
    id: string,
    data: UserFormData,
  ) => {
    const done = await _editOne({ data, id });

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const sendEditEmailOne: UserState["sendEditEmailOne"] = async (
    email: string,
  ) => {
    const done = await _sendEditEmail(email);

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const editPasswordOne: UserState["editPasswordOne"] = async (
    newPassword: string,
  ) => {
    const done = await _editPassword(newPassword);

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const applyFilters = (newFilter: Partial<UserFilter>) => {
    setFilter(() => ({
      ...initialUserFilter,
      ...newFilter,
    }));
  };

  const state: UserState = {
    list,
    filter,
    pagination,
    getAll,
    sendCreateEmailOne,
    sendEditEmailOne,
    editPasswordOne,
    createOne,
    editOne,
    deleteOne,
    deleteMany,
    applyFilters,
    setPagination,
  };

  return (
    <UsersContext.Provider value={state}>{children}</UsersContext.Provider>
  );
};
