import { FC, PropsWithChildren, useState } from "react";
import { EmployeesContext } from "./EmployeesContext";
import {
  EmployeeData,
  EmployeeFilter,
  EmployeeForTable,
  EmployeeFormData,
  EmployeeState,
  initialEmployeeFilter,
} from "@app/models/employee.model";
import { Pagination, initialPagination } from "@app/models/pagination";
import { useRequest } from "@app/hooks/useRequest";
import {
  createEmployee,
  deleteEmployee,
  deleteEmployees,
  editEmployee,
  getEmployees,
  getEmployee as getEmployeeApi,
} from "@app/config/api/backend/requests/employees";
import {
  getClientsCatalogue,
  getDepartmentsCatalogue,
} from "@app/config/api/backend/requests/catalogues";
import { Catalogue } from "@app/models/catalogue.model";

export const EmployeesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [clients, setClients] = useState<Catalogue>([]);
  const [departments, setDepartments] = useState<Catalogue>([]);
  const [list, setList] = useState<EmployeeForTable[]>();
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [filter, setFilter] = useState<EmployeeFilter>(initialEmployeeFilter);
  const [employee, setEmployee] = useState<EmployeeData>();

  const _getClientsCatalogue = useRequest(getClientsCatalogue);
  const _getDepartmentsCatalogue = useRequest(getDepartmentsCatalogue);
  const _getAll = useRequest(getEmployees);
  const _createOne = useRequest(createEmployee);
  const _editOne = useRequest(editEmployee);
  const _deleteOne = useRequest(deleteEmployee);
  const _deleteMany = useRequest(deleteEmployees);
  const _getEmployee = useRequest(getEmployeeApi);

  const getClients: EmployeeState["catalogues"]["getClients"] = async () => {
    const catalogue = await _getClientsCatalogue({});

    if (catalogue) {
      setClients(catalogue);

      return catalogue;
    }
  };

  const getDepartments: EmployeeState["catalogues"]["getDepartments"] = async (
    clientId
  ) => {
    if (clientId) {
      const catalogue = await _getDepartmentsCatalogue(clientId);

      if (catalogue) {
        setDepartments(catalogue);

        return catalogue;
      }
    } else {
      setDepartments([]);

      return [];
    }
  };

  const getAll: EmployeeState["getAll"] = async ({
    filter: _filter,
    pagination: _pagination,
  }: {
    filter?: Partial<EmployeeFilter>;
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
      const { list: employees, ...pagination } = response;

      setList(employees);
      setPagination({
        ...pagination,
        totalItems: pagination.totalRows,
      });

      return employees;
    }
  };

  const createOne: EmployeeState["createOne"] = async (
    data: EmployeeFormData
  ) => {
    const done = await _createOne({ data });

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const editOne: EmployeeState["editOne"] = async (
    id: string,
    data: EmployeeFormData
  ) => {
    const done = await _editOne({ data, id });

    if (done) {
      await getAll();

      return true;
    } else {
      return false;
    }
  };

  const deleteOne: EmployeeState["deleteOne"] = async (id: string) => {
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

  const deleteMany: EmployeeState["deleteMany"] = async (ids: string[]) => {
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

  const applyFilters = (newFilter: Partial<EmployeeFilter>) => {
    setFilter((filter) => ({
      ...initialEmployeeFilter,
      ...newFilter,
      departmentId:
        filter.clientId !== newFilter.clientId
          ? ""
          : newFilter.departmentId || "",
    }));
  };

  const getEmployee: EmployeeState["getEmployee"] = async (idCard) => {
    const response = await _getEmployee({ idCard });

    if (response) {
      setEmployee(response);
      return response;
    }
  };

  const state: EmployeeState = {
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
      departments,
      getClients,
      getDepartments,
    },
    getEmployee,
    employee,
  };

  return (
    <EmployeesContext.Provider value={state}>
      {children}
    </EmployeesContext.Provider>
  );
};
