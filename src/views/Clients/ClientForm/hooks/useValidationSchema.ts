import { ClientFormData } from "@app/models/client.model";
import * as yup from "yup";

export const useValidationSchema = () => {
  const requiredError = "Este campo es requerido";

  const validationSchema = yup.object().shape({
    name: yup.string().required(requiredError),
    departments: yup.array().of(yup.string().required(requiredError)),
  }) as unknown as yup.ObjectSchema<ClientFormData>;

  return validationSchema;
};
