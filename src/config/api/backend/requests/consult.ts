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
    idCard: +data.idCard,
    TAResult: +data.TAResult,
    FCResult: +data.FCResult,
    SPO2Result: +data.SPO2Result,
    FRResult: +data.FRResult,
    weight: +data.weight,
    size: +data.size,
    IMCResult: +data.IMCResult,
    temperature: +data.temperature,
  });

  return response.status === 200;
};

export const createConsult = async ({ data }: { data: ConsultFormData }) => {
  const response = await backend.post("consult/create", {
    ...data,
    idCard: +data.idCard,
    TAResult: +data.TAResult,
    FCResult: +data.FCResult,
    SPO2Result: +data.SPO2Result,
    FRResult: +data.FRResult,
    weight: +data.weight,
    size: +data.size,
    IMCResult: +data.IMCResult,
    temperature: +data.temperature,
  });

  return response.status === 201;
};
