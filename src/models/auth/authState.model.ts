import { AuthRoleEnum, AuthStatusEnum } from "@app/enums/auth";
import { LoginData } from "./loginData.model";

export type AuthState = {
  status: AuthStatusEnum;
  role?: AuthRoleEnum;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
};
