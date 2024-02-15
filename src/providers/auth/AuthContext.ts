import { createContext } from "react";
import { AuthState } from "@app/models/auth";

export const AuthContext = createContext({} as AuthState);
