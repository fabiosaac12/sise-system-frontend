import { Catalogue } from "@app/models/catalogue.model";
import { backend } from "../instance";

export const getClientsCatalogue = async () => {
  const response = await backend.get<{ clientsCatalogue: Catalogue }>(
    "client/catalogue"
  );

  const {
    data: { clientsCatalogue },
  } = response;

  return clientsCatalogue;
};

export const getDepartmentsCatalogue = async (clientId: string) => {
  const response = await backend.get<{ departmentsCatalogue: Catalogue }>(
    `department/catalogue/${clientId}`
  );

  const {
    data: { departmentsCatalogue },
  } = response;

  return departmentsCatalogue;
};
