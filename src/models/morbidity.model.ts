import { Dayjs } from "dayjs";

export type MorbidityForTable = {
  date: Dayjs;
  hour: Dayjs;
  idCard: string;
  age: number;
  firstNames: string;
  lastNames: string;
  diagnosis: string;
  treatment?: string;
  quantity?: number;
};

export type MorbidityFormData = {
  date: Dayjs;
  hour: Dayjs;
  idCard: string;
  firstNames: string;
  lastNames: string;
  diagnosis: string;
  treatment?: string;
  quantity?: number | string;
};

export type MorbidityFilter = {
  date: Dayjs;
  clientID: string;
  workPosition: string;
};

export const initialMorbidityFilter: MorbidityFilter = {
  date: null as unknown as Dayjs,
  clientID: "",
  workPosition: "",
};

export type MorbidityState = {
  list?: MorbidityForTable;
  filter: MorbidityFilter;
  pagination: Pagination;
  getall: (props?: {
    filter?: Partial<MorbidityFilter>;
    pagination?: Partial<Pagination>;
  }) => Promise<MorbidityForTable[] | undefined>;
  createOne: (data: MorbidityFormData) => Promise<boolean>;
  editOne: (id: string, data: MorbidityFormData) => Promise<boolean>;
  deleteOne: (id: string) => Promise<boolean>;
  applyFilters: (filter: Partial<MorbidityFilter>) => void;
  setPagination: Dispatch<React.SetStateAction<Pagination>>;
  catalogues: {
    clients: Catalogue;
    departments: Catalogue;
    getClients: () => Promise<Catalogue | undefined>;
    getDepartments: (clientId?: string) => Promise<Catalogue | undefined>;
  };
};
