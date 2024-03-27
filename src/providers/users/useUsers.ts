import { useContext } from "react";
import { UsersContext } from "./UsersContext";

export const useUsers = () => useContext(UsersContext);
