import { FC, PropsWithChildren, useState } from 'react';
import { DepartmentContext } from './DepartmentsContext';
import { Pagination, initialPagination } from '@app/models/pagination';
import {
  DepartmentFilter,
  DepartmentForTable,
  DepartmentState,
  initialDepartmentFilter,
} from '@app/models/department.model';
import { Catalogue } from '@app/models/catalogue.model';
import { useRequest } from '@app/hooks/useRequest';
import {
  getClientsCatalogue,
  getDepartmentsCatalogue,
} from '@app/config/api/backend/requests/catalogues';
import {
  createDeparment,
  deleteDepartment,
  deleteDepartments,
  editDepartment,
  getDepartments,
} from '@app/config/api/backend/requests/departments';

export const DeparmentsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [clients, setClients] = useState<Catalogue>([]);
  const [departments, setDepartments] = useState<Catalogue>([]);
  const [list, setList] = useState<DepartmentForTable[]>();
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [filter, setFilter] = useState<DepartmentFilter>(
    initialDepartmentFilter
  );

  const _getClientsCatalogue = useRequest(getClientsCatalogue);
  const _getDepartmentsCatalogue = useRequest(getDepartmentsCatalogue);
  const _getAll = useRequest(getDepartments);
  const _createOne = useRequest(createDeparment);
  const _editOne = useRequest(editDepartment);
  const _deleteOne = useRequest(deleteDepartment);
  const _deleteMany = useRequest(deleteDepartments);

  const getClients: DepartmentState['catalogues']['getClients'] = async () => {
    const catalogue = await _getClientsCatalogue({});

    if (catalogue) {
      setClients(catalogue);

      return catalogue;
    }
  };

  const _getDepartments: DepartmentState['catalogues']['getDepartments'] =
    async (clientId) => {
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

  const getAll: DepartmentState['getAll'] = async (props) => {
    if (!filter.clientId) {
      setList(undefined);

      return undefined;
    }

    const response = await _getAll({
      filter: {
        ...filter,
        ...props?.filter,
      },
      pagination: {
        ...pagination,
        ...props?.pagination,
      },
    });

    if (response) {
      const { list: departments, ...pagination } = response;

      setPagination({ ...pagination, totalItems: pagination.totalRows });

      setList(departments);
      return departments;
    }
  };
  const createOne: DepartmentState['createOne'] = async (data) => {
    const done = await _createOne({ data });

    if (done) {
      await getAll();

      return true;
    }
    return false;
  };

  const editOne: DepartmentState['editOne'] = async (data, id) => {
    const done = await _editOne({ data, id });

    if (done) {
      await getAll();

      return true;
    }
    return false;
  };
  const deleteOne: DepartmentState['deleteOne'] = async (id) => {
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

  const deleteMany: DepartmentState['deleteMany'] = async (ids) => {
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
    }
    return false;
  };

  const applyFilters = (newFilter: Partial<DepartmentFilter>) => {
    setFilter({
      ...initialDepartmentFilter,
      ...newFilter,
    });
  };

  const state: DepartmentState = {
    getAll,
    createOne,
    editOne,
    deleteOne,
    deleteMany,
    setPagination,
    applyFilters,
    list,
    filter,
    pagination,
    catalogues: {
      clients,
      getClients,
      departments,
      getDepartments: _getDepartments,
    },
  };
  return (
    <DepartmentContext.Provider value={state}>
      {children}
    </DepartmentContext.Provider>
  );
};
