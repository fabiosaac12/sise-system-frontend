import { backend } from '../instance';
import {
  EmployeeData,
  EmployeeFilter,
  EmployeeForTable,
  EmployeeFormData,
} from '@app/models/employee.model';
import { PaginatedResponse, Pagination } from '@app/models/pagination';

export const deleteEmployee = async ({ id }: { id: string }) => {
  const response = await backend.delete(`employee/delete/${id}`);

  return response.status === 200;
};

export const deleteEmployees = async ({ ids }: { ids: string[] }) => {
  const response = await backend.delete('employee/deleteMany', {
    params: { ids },
  });

  return response.status === 200;
};

export const editEmployee = async ({
  data,
  id,
}: {
  data: EmployeeFormData;
  id: string;
}) => {
  const response = await backend.put(`employee/edit/${id}`, {
    ...data,
    idCard: +data.idCard,
  });

  return response.status === 200;
};

export const createEmployee = async ({ data }: { data: EmployeeFormData }) => {
  const response = await backend.post('employee/create', {
    ...data,
    idCard: +data.idCard,
  });

  return response.status === 201;
};

export const getEmployees = async ({
  filter,
  pagination,
}: {
  filter: EmployeeFilter;
  pagination: Pagination;
}) => {
  const response = await backend.get<PaginatedResponse<EmployeeForTable>>(
    'employee',
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

export const getEmployee = async ({
  idCard,
}: {
  idCard: number;
}): Promise<EmployeeData | undefined> => {
  const response = await backend.get<{ employee: EmployeeData }>(
    `employee/${idCard}`
  );

  return response.data.employee;
};
