import { backend } from "../instance";
import {
  ClientFilter,
  ClientForTable,
  ClientFormData,
} from "@app/models/client.model";
import { PaginatedResponse, Pagination } from "@app/models/pagination";

export const deleteClient = async ({ id }: { id: string }) => {
  const response = await backend.delete(`client/delete/${id}`);

  return response.status === 200;
};

export const deleteClients = async ({ ids }: { ids: string[] }) => {
  const response = await backend.delete("client/deleteMany", {
    params: { ids },
  });

  return response.status === 200;
};

export const editClient = async ({
  data,
  id,
}: {
  data: ClientFormData;
  id: string;
}) => {
  const response = await backend.put(`client/edit/${id}`, {
    ...data,
  });

  return response.status === 200;
};

export const createClient = async ({ data }: { data: ClientFormData }) => {
  const response = await backend.post("client/create", {
    ...data,
  });

  return response.status === 201;
};

export const getClients = async ({
  filter,
  pagination,
}: {
  filter: ClientFilter;
  pagination: Pagination;
}) => {
  const response = await backend.get<PaginatedResponse<ClientForTable>>(
    "client",
    {
      params: {
        ...filter,
        limit: pagination.rowsPerPage,
        page: pagination.currentPage,
      },
    }
  );

  const { data } = response;

  return data.response;
};
