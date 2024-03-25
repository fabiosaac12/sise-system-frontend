import { Dispatch } from "react";
import { Pagination } from "./pagination";

export type UserForTable = {
  id: string;
  email: string;
  firstNames: string;
  lastNames: string;
};

export type UserFormData = {
  email: string;
  firstNames: string;
  lastNames: string;
};

export type UserFilter = {
  email: string;
  firstNames: string;
  lastNames: string;
};

export const initialUserFilter = {
  email: "",
  firstNames: "",
  lastNames: "",
};

export type UserState = {
  list?: UserForTable[];
  filter: UserFilter;
  pagination: Pagination;
  getAll: (props?: {
    filter?: Partial<UserFilter>;
    pagination?: Partial<Pagination>;
  }) => Promise<UserForTable[] | undefined>;
  sendCreateEmailOne: (data: UserFormData) => Promise<boolean>;
  sendEditEmailOne: (email: string) => Promise<boolean>;
  editPasswordOne: (newPassword: string) => Promise<boolean>;
  createOne: (password: string) => Promise<boolean>;
  editOne: (id: string, data: UserFormData) => Promise<boolean>;
  deleteOne: (id: string) => Promise<boolean>;
  deleteMany: (ids: string[]) => Promise<boolean>;
  applyFilters: (filter: Partial<UserFilter>) => void;
  setPagination: Dispatch<React.SetStateAction<Pagination>>;
};
