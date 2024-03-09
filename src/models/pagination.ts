export interface Pagination {
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  pages: number;
}

export type PaginatedResponse<T> = {
  response: {
    currentPage: number;
    employees: T[];
    rowsPerPage: number;
    pages: number;
    totalEmployees: number;
  };
};

export const initialPagination: Pagination = {
  totalItems: 0,
  rowsPerPage: 5,
  currentPage: 1,
  pages: 1,
};
