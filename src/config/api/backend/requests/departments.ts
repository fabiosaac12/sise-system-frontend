import { backend } from '../instance';
import {
  DepartmentFilter,
  DepartmentForTable,
  DepartmentFormData,
} from '@app/models/department.model';
import { PaginatedResponse, Pagination } from '@app/models/pagination';

export const createDeparment = async ({
  data,
}: {
  data: DepartmentFormData;
}) => {
  const response = await backend.post('department/create', {
    ...data,
  });

  return response.status === 201;
};

export const getDepartments = async ({
  filter,
  pagination,
}: {
  filter: DepartmentFilter;
  pagination: Pagination;
}) => {
  const response = await backend.get<PaginatedResponse<DepartmentForTable>>(
    `department/${filter.clientId}`,
    {
      params: {
        limit: pagination.rowsPerPage,
        page: pagination.currentPage,
        order: 'asc',
      },
    }
  );

  const { data } = response;

  return data.response;
};

export const editDepartment = async ({
  data,
  id,
}: {
  data: DepartmentFormData;
  id: string;
}) => {
  const response = await backend.patch(`department/edit/${id}`, {
    ...data,
  });

  return response.status === 200;
};

export const deleteDepartment = async ({ id }: { id: string }) => {
  const response = await backend.delete(`department/delete/${id}`);

  return response.status === 200;
};

export const deleteDepartments = async ({ ids }: { ids: string[] }) => {
  const response = await backend.delete('department/deleteMany/', {
    params: {
      ids,
    },
  });

  return response.status === 200;
};
