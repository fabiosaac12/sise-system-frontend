import { Dispatch } from "react";
import { Pagination } from "./pagination";
import { Catalogue } from "./catalogue.model";

export type ClientForTable = {
  id: string;
  name: string;
  departments: string[];
};

export type ClientFormData = {
  name: string;
  departments: string[];
};

export type ClientFilter = {
  clientId: string;
};

export const initialClientFilter = {
  clientId: "",
};

export type ClientState = {
  list?: ClientForTable[];
  filter: ClientFilter;
  pagination: Pagination;
  getAll: (props?: {
    filter?: Partial<ClientFilter>;
    pagination?: Partial<Pagination>;
  }) => Promise<ClientForTable[] | undefined>;
  createOne: (data: ClientFormData) => Promise<boolean>;
  editOne: (id: string, data: ClientFormData) => Promise<boolean>;
  deleteOne: (id: string) => Promise<boolean>;
  deleteMany: (ids: string[]) => Promise<boolean>;
  applyFilters: (filter: Partial<ClientFilter>) => void;
  setPagination: Dispatch<React.SetStateAction<Pagination>>;
  catalogues: {
    clients: Catalogue;
    departments: Catalogue;
    getClientsF: () => Promise<Catalogue | undefined>;
    getDepartments: (clientId?: string) => Promise<Catalogue | undefined>;
  };
};
