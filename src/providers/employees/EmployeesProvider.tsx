import { FC, PropsWithChildren, useState } from "react";
import { EmployeesContext } from "./EmployeesContext";
import {
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
  getEmployees,
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

  const _getClientsCatalogue = useRequest(getClientsCatalogue);
  const _getDepartmentsCatalogue = useRequest(getDepartmentsCatalogue);
  const _getAll = useRequest(getEmployees);
  const _createOne = useRequest(createEmployee);

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

  const getAll: EmployeeState["getAll"] = async () => {
    const response = await _getAll({ filter, pagination });

    if (response) {
      const { employees, ...pagination } = response;

      setList(employees);
      setPagination({
        ...pagination,
        totalItems: pagination.totalEmployees,
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

  console.log(filter);

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

  const state: EmployeeState = {
    createOne,
    getAll,
    applyFilters,
    filter,
    list,
    pagination,
    catalogues: {
      clients,
      departments,
      getClients,
      getDepartments,
    },
  };

  return (
    <EmployeesContext.Provider value={state}>
      {children}
    </EmployeesContext.Provider>
  );
};
