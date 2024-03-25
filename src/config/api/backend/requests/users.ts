import { backend } from "../instance";
import { UserFilter, UserForTable, UserFormData } from "@app/models/user.model";
import { PaginatedResponse, Pagination } from "@app/models/pagination";

export const getUsers = async ({
  filter,
  pagination,
}: {
  filter?: UserFilter;
  pagination: Pagination;
}) => {
  const response = await backend.get<PaginatedResponse<UserForTable>>("user", {
    params: {
      ...filter,
      order: "asc",
      limit: pagination.rowsPerPage,
      page: pagination.currentPage,
    },
  });

  const { data } = response;

  return data.response;
};

export const sendCreateEmail = async ({ data }: { data: UserFormData }) => {
  const response = await backend.post("user/sendCreateEmail", {
    ...data,
  });

  return response.status === 201;
};

export const createUser = async (password: string) => {
  const response = await backend.post("user/create", {
    password,
  });

  return response.status === 201;
};

export const deleteUser = async ({ id }: { id: string }) => {
  const response = await backend.delete(`user/delete/${id}`);

  return response.status === 200;
};

export const deleteUsers = async ({ ids }: { ids: string[] }) => {
  const response = await backend.delete("user/deleteMany", {
    params: { ids },
  });

  return response.status === 200;
};

export const editUser = async ({
  data,
  id,
}: {
  data: UserFormData;
  id: string;
}) => {
  const response = await backend.put(`user/edit/${id}`, {
    ...data,
  });

  return response.status === 200;
};

export const sendEditEmail = async (email: string) => {
  const response = await backend.post("user/sendEditEmail", {
    email,
  });

  return response.status === 201;
};

export const editPassword = async (newPassword: string) => {
  const response = await backend.patch("user/editPassword", {
    newPassword,
  });

  return response.status === 200;
};
