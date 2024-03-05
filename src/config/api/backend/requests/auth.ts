import { LoginData } from "@app/models/auth";
import { backend } from "../instance";
import { AuthRoleEnum } from "@app/enums/auth";

type LoginResponse = {
  accessToken: string;
  role: AuthRoleEnum;
};

export const loginRequest = async ({ data }: { data: LoginData }) => {
  const response = await backend.post<LoginResponse>("auth/signIn", data);

  const {
    data: { accessToken, role },
  } = response;

  localStorage.setItem("token", accessToken);

  return { role };
};

type RefreshResponse = {
  accessToken: string;
  role: AuthRoleEnum;
};

export const refreshRequest = async () => {
  const response = await backend.get<RefreshResponse>("auth/refresh");

  const {
    data: { accessToken, role },
  } = response;

  localStorage.setItem("token", accessToken);

  return { role };
};
