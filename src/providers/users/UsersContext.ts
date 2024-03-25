import { UserState } from "@app/models/user.model";
import { createContext } from "react";

export const UsersContext = createContext({} as UserState);
