import { backend } from "../instance";
import { ConsultFormData } from "@app/models/consult.model";

export const editConsult = async ({
  data,
  id,
}: {
  data: ConsultFormData;
  id: string;
}) => {
  const response = await backend.put(`consult/edit/${id}`, {
    ...data,
  });

  return response.status === 200;
};

export const createConsult = async ({ data }: { data: ConsultFormData }) => {
  const response = await backend.post("consult/create", {
    ...data,
  });

  return response.status === 201;
};
