import { MorbidityFormData } from "@app/models/morbidity.model";
import * as yup from "yup";

export const useValidationSchema = () => {
  const requiredError = "Este campo es requerido";

  const validationSchema = yup.object().shape({
    date: yup
      .date()
      .typeError("Introduzca una fecha válida")
      .required(requiredError),
    hour: yup
      .date()
      .typeError("Introduzca una hora válida")
      .required(requiredError),
    idCard: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .moreThan(0, "Introduzca un número de cédula válido")
      .required(requiredError),
    firstNames: yup.string().required(requiredError),
    lastNames: yup.string().required(requiredError),
    diagnosis: yup.string().required(requiredError),
    treatment: yup.string(),
    quantity: yup.number(),
  }) as unknown as yup.ObjectSchema<MorbidityFormData>;

  return validationSchema;
};
