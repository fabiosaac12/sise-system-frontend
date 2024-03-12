import { useContext } from "react";
import { EmployeesContext } from "./EmployeesContext";

export const useEmployees = () => useContext(EmployeesContext);
