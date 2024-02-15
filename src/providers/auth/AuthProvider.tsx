import { AuthRoleEnum, AuthStatusEnum } from "@app/enums/auth";
import { AuthState, LoginData } from "@app/models/auth";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatusEnum>(AuthStatusEnum.loading);
  const [role, setRole] = useState<AuthRoleEnum>();

  useEffect(() => {
    const role = localStorage.getItem("role") as AuthRoleEnum | null;

    if (role) {
      setRole(role);
      setStatus(AuthStatusEnum.loggedIn);
    } else {
      setStatus(AuthStatusEnum.loggedOut);
    }
  }, []);

  const login: AuthState["login"] = async (data: LoginData) => {
    if (data.password !== "1232") {
      setStatus(AuthStatusEnum.loggedOut);

      return false;
    }

    const role = data.email.includes("admin")
      ? AuthRoleEnum.admin
      : AuthRoleEnum.user;

    localStorage.setItem("role", role);

    setRole(role);
    setStatus(AuthStatusEnum.loggedIn);

    return true;
  };

  const logout: AuthState["logout"] = async () => {
    localStorage.removeItem("role");

    setStatus(AuthStatusEnum.loggedOut);
    setRole(undefined);
  };

  const state: AuthState = {
    status,
    role,
    login,
    logout,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
