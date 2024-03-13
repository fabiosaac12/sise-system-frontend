import { backend } from '../instance';
import {
  DepartmentFilter,
  DepartmentForTable,
  DepartmentFormData,
} from '@app/models/department.model';
import { PaginatedResponse, Pagination } from '@app/models/pagination';

export const createDeparment = async (data: DepartmentFormData) => {
  const response = await backend.post('department/create', {
    ...data,
  });

  return response.status === 201;
};

export const getDepartments = async ({
  id,
  filter,
  pagination,
}: {
  filter: DepartmentFilter;
  pagination: Pagination;
  id: string;
}) => {
  const response = await backend.get<PaginatedResponse<DepartmentForTable>>(
    `department/${id}`,
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

export const deleteDepartment = async (id: string) => {
  const response = await backend.delete(`department/delete/${id}`);

  return response.status === 200;
};

export const deleteDepartments = async (ids: string[]) => {
  const response = await backend.delete('department/delete/', {
    params: {
      ids,
    },
  });

  return response.status === 200;
};
