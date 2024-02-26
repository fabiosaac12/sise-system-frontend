import { AuthRoleEnum, AuthStatusEnum } from "@app/enums/auth";
import { AuthState, LoginData } from "@app/models/auth";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useRequest } from "@app/hooks/useRequest";
import {
  loginRequest,
  refreshRequest,
} from "@app/config/api/backend/requests/auth";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatusEnum>(AuthStatusEnum.loading);
  const [role, setRole] = useState<AuthRoleEnum>();

  const _login = useRequest(loginRequest);
  const _refresh = useRequest(refreshRequest);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await _refresh({});

          if (response) {
            const role = response.role;

            setRole(role);
            setStatus(AuthStatusEnum.loggedIn);
          } else {
            throw new Error();
          }
        } else {
          throw new Error();
        }
      } catch {
        localStorage.removeItem("token");

        setStatus(AuthStatusEnum.loggedOut);
      }
    })();
  }, [_refresh]);

  const login: AuthState["login"] = async (data: LoginData) => {
    const response = await _login({ data });

    if (response) {
      const role = response.role;

      setRole(role);
      setStatus(AuthStatusEnum.loggedIn);

      return true;
    }

    return false;
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
