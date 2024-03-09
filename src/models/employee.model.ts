import { Catalogue } from "./catalogue.model";
import { Pagination } from "./pagination";

export enum GenderEnum {
  female = "F",
  male = "M",
}

export enum EmployeeStatusEnum {
  permanent = "FIJO",
  hired = "CONTRATADO",
}

export enum CivilStatusEnum {
  single = "S",
  widower = "V",
  divorced = "D",
  married = "C",
  u = "U",
  o = "O",
}

export enum DominantHandEnum {
  right = "D",
  left = "I",
}

export type EmployeeForTable = {
  id: string;
  clientName: string;
  departmentName: string;
  firstNames: string;
  lastNames: string;
  idCard: number;
  status: EmployeeStatusEnum;
  workPosition: string;
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
  birthdate: Date;
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
  clientId: "",
  departmentId: "",
  idCard: "",
};

export type EmployeeState = {
  list?: EmployeeForTable[];
  filter: EmployeeFilter;
  pagination: Pagination;
  getAll: () => Promise<EmployeeForTable[] | undefined>;
  createOne: (data: EmployeeFormData) => Promise<boolean>;
  applyFilters: (filter: Partial<EmployeeFilter>) => void;
  catalogues: {
    clients: Catalogue;
    departments: Catalogue;
    getClients: () => Promise<Catalogue | undefined>;
    getDepartments: (clientId?: string) => Promise<Catalogue | undefined>;
  };
};
