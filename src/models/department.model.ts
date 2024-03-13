export type DepartmentFilter = {
  departmentId: string;
};

export type DepartmentForTable = {
  id: string;
  name: string;
  _count: {
    employees: number;
  };
};

export type DepartmentFormData = {
  name: string;
  clientId: string;
};
