import { useContext } from "react";
import { UsersContext } from "./UsersContext";

export const useEmployees = () => useContext(UsersContext);
