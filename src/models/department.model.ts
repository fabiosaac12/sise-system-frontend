import { Dispatch } from 'react';
import { Catalogue } from './catalogue.model';
import { Pagination } from './pagination';

export type DepartmentForTable = {
  id: string;
  name: string;
  _count: {
    employees: number;
  };
  clientId: string;
};

export type DepartmentFormData = {
  name: string;
  clientId: string;
};

export type DepartmentFilter = {
  clientId: string;
};

export const initialDepartmentFilter: DepartmentFilter = {
  clientId: '',
};

export type DepartmentState = {
  createOne: (data: DepartmentFormData) => Promise<boolean>;
  getAll: (props?: {
    filter?: DepartmentFilter;
    pagination?: Partial<Pagination>;
  }) => Promise<DepartmentForTable[] | undefined>;
  editOne: (data: DepartmentFormData, id: string) => Promise<boolean>;
  deleteOne: (id: string) => Promise<boolean>;
  deleteMany: (ids: string[]) => Promise<boolean>;
  applyFilters: (filter: Partial<DepartmentFilter>) => void;
  setPagination: Dispatch<React.SetStateAction<Pagination>>;
  pagination: Pagination;
  list?: DepartmentForTable[];
  filter: DepartmentFilter;
  catalogues: {
    clients: Catalogue;
    getClients: () => Promise<Catalogue | undefined>;
    departments: Catalogue;
    getDepartments: (clientId?: string) => Promise<Catalogue | undefined>;
  };
};
