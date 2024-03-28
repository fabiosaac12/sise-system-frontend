import {
  Morbidity,
  MorbidityFilter,
  MorbidityForTable,
} from "@app/models/morbidity.model";
import { backend } from "../instance";

import { PaginatedResponse, Pagination } from "@app/models/pagination";

export const deleteMorbidity = async ({ id }: { id: string }) => {
  const response = await backend.delete(`morbidity/delete/${id}`);

  return response.status === 200;
};

export const deleteMorbiditys = async ({ ids }: { ids: string[] }) => {
  const response = await backend.delete("morbidity/deleteMany", {
    params: { ids },
  });

  return response.status === 200;
};

export const editMorbidity = async ({
  data,
  id,
}: {
  data: Morbidity;
  id: string;
}) => {
  const response = await backend.put(`morbidity/edit/${id}`, {
    ...data,
    idCard: +data.idCard,
  });

  return response.status === 200;
};

export const createMorbidity = async ({ data }: { data: Morbidity }) => {
  const response = await backend.post("morbidity/create", {
    ...data,
    idCard: +data.idCard,
  });

  return response.status === 201;
};

export const getMorbiditys = async ({
  filter,
  pagination,
}: {
  filter: MorbidityFilter;
  pagination: Pagination;
}) => {
  const response = await backend.get<PaginatedResponse<MorbidityForTable>>(
    "morbidity",
    {
      params: {
        ...filter,
        date: new Date(
          new Date(filter.date).setHours(0, 0, 0, 0),
        ).toISOString(),
        order: "asc",
        limit: pagination.rowsPerPage,
        page: pagination.currentPage,
      },
    },
  );

  const { data } = response;

  return data.response;
};
