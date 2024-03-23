import { Dispatch } from "react";
import { Pagination } from "./pagination";

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
  name: string;
};

export const initialClientFilter = {
  name: "",
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
};
