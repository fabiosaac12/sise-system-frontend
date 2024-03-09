import { backend } from "../instance";
import {
  EmployeeFilter,
  EmployeeForTable,
  EmployeeFormData,
} from "@app/models/employee.model";
import { PaginatedResponse, Pagination } from "@app/models/pagination";

export const createEmployee = async ({ data }: { data: EmployeeFormData }) => {
  const response = await backend.post("employee/create", data);

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
    "employee",
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
