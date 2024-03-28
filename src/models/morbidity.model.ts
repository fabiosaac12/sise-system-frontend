import { Dayjs } from "dayjs";
import { Dispatch } from "react";
import { Pagination } from "./pagination";
import { Catalogue } from "./catalogue.model";

export enum DiagnosisTypeEnum {
  cefalea = "cefalea",
  herida = "herida",
}
export type MorbidityForTable = {
  id: string;
  dateTime: string;
  employee: {
    idCard: string;
    firstNames: string;
    lastNames: string;
    birthdate: string;
    workPosition: string;
  };
  diagnosis: DiagnosisTypeEnum;
  treatment?: string;
  quantity?: string;
};

export type MorbidityFormData = {
  date: Dayjs;
  hour: Dayjs;
  idCard: string;
  diagnosis: DiagnosisTypeEnum;
  treatment?: string;
  quantity?: string;
};
export type Morbidity = {
  dateTime: Dayjs;
  idCard: string;
  diagnosis: DiagnosisTypeEnum;
  treatment?: string | null;
  quantity?: number | null;
};

export type MorbidityFilter = {
  date: string;
  clientId: string;
  workPosition: string;
};

export const initialMorbidityFilter: MorbidityFilter = {
  date: "",
  clientId: "",
  workPosition: "",
};

export type MorbidityState = {
  list?: MorbidityForTable[];
  filter: MorbidityFilter;
  pagination: Pagination;
  getAll: (props?: {
    filter?: Partial<MorbidityFilter>;
    pagination?: Partial<Pagination>;
  }) => Promise<MorbidityForTable[] | undefined>;
  createOne: (data: Morbidity) => Promise<boolean>;
  editOne: (id: string, data: Morbidity) => Promise<boolean>;
  deleteOne: (id: string) => Promise<boolean>;
  deleteMany: (id: string[]) => Promise<boolean>;
  applyFilters: (filter: Partial<MorbidityFilter>) => void;
  setPagination: Dispatch<React.SetStateAction<Pagination>>;
  catalogues: {
    clients: Catalogue;
    getClients: () => Promise<Catalogue | undefined>;
  };
};
