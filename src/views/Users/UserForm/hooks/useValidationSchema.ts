import { UserFormData } from "@app/models/user.model";
import * as yup from "yup";

export const useValidationSchema = () => {
  const requiredError = "Este campo es requerido";
  const invalidEmail = "Introduzca una dirección de correo electrónico válida";

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(requiredError),
    lastName: yup.string().required(requiredError),
    email: yup.string().required(requiredError).email(invalidEmail),
  }) as unknown as yup.ObjectSchema<UserFormData>;

  return validationSchema;
};
