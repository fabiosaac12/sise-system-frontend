import { Dayjs } from 'dayjs';
import { Catalogue } from './catalogue.model';
import { Pagination } from './pagination';
import { Dispatch } from 'react';

export enum GenderEnum {
  female = 'F',
  male = 'M',
}

export enum EmployeeStatusEnum {
  permanent = 'FIJO',
  hired = 'CONTRATADO',
}

export enum CivilStatusEnum {
  single = 'S',
  widower = 'V',
  divorced = 'D',
  married = 'C',
  u = 'U',
  o = 'O',
}

export enum DominantHandEnum {
  right = 'D',
  left = 'I',
}

export type EmployeeForTable = {
  id: string;
  department: {
    id: string;
    name: string;
    client: {
      id: string;
      name: string;
    };
  };
  firstNames: string;
  lastNames: string;
  idCard: number;
  status: EmployeeStatusEnum;
  workPosition: string;
  birthplace: string;
  birthdate: string;
  address: string;
  gender: GenderEnum;
  civilStatus: CivilStatusEnum;
  dominantHand: DominantHandEnum;
  profession: string;
};

export type Employee = {
  id: string;
  client: {
    id: string;
    name: string;
  };
  department: {
    id: string;
    name: string;
  };
  firstNames: string;
  lastNames: string;
  idCard: number;
  status: EmployeeStatusEnum;
  birthplace: string;
  birthdate: Date;
  address: string;
  gender: GenderEnum;
  workPosition: string;
  civilStatus: CivilStatusEnum;
  dominantHand: DominantHandEnum;
  profession: string;
};

export type EmployeeFormData = {
  clientId: string;
  departmentId: string;
  firstNames: string;
  lastNames: string;
  idCard: string;
  status: EmployeeStatusEnum;
  birthplace: string;
  birthdate: Dayjs;
  address: string;
  gender: GenderEnum;
  workPosition: string;
  civilStatus: CivilStatusEnum;
  dominantHand: DominantHandEnum;
  profession: string;
};

export type EmployeeFilter = {
  clientId: string;
  departmentId: string;
  idCard: string;
};

export const initialEmployeeFilter: EmployeeFilter = {
  clientId: '',
  departmentId: '',
  idCard: '',
};

export type EmployeeData = {
  idcard: number;
  firstNames: string;
  lastNames: string;
};

export type EmployeeData = {
  idcard: number;
  firstNames: string;
  lastNames: string;
};

export type EmployeeState = {
  list?: EmployeeForTable[];
  filter: EmployeeFilter;
  pagination: Pagination;
  getAll: (props?: {
    filter?: Partial<EmployeeFilter>;
    pagination?: Partial<Pagination>;
  }) => Promise<EmployeeForTable[] | undefined>;
  createOne: (data: EmployeeFormData) => Promise<boolean>;
  editOne: (id: string, data: EmployeeFormData) => Promise<boolean>;
  deleteOne: (id: string) => Promise<boolean>;
  deleteMany: (ids: string[]) => Promise<boolean>;
  applyFilters: (filter: Partial<EmployeeFilter>) => void;
  setPagination: Dispatch<React.SetStateAction<Pagination>>;
  employee?: EmployeeData;
  getEmployee: (idCard: number) => Promise<EmployeeData | undefined>;
  catalogues: {
    clients: Catalogue;
    departments: Catalogue;
    getClients: () => Promise<Catalogue | undefined>;
    getDepartments: (clientId?: string) => Promise<Catalogue | undefined>;
  };
};
