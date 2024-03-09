import { EmployeeState } from "@app/models/employee.model";
import { createContext } from "react";

export const EmployeesContext = createContext({} as EmployeeState);
