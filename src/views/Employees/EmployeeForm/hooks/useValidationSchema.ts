import {
  CivilStatusEnum,
  DominantHandEnum,
  EmployeeFormData,
  EmployeeStatusEnum,
  GenderEnum,
} from "@app/models/employee.model";
import * as yup from "yup";

export const useValidationSchema = () => {
  const requiredError = "Este campo es requerido";

  const validationSchema = yup.object().shape({
    clientId: yup.string().required(requiredError),
    departmentId: yup.string().required(requiredError),
    firstNames: yup.string().required(requiredError),
    lastNames: yup.string().required(requiredError),
    idCard: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .moreThan(0, "Introduzca un número de cédula válido")
      .required(requiredError),
    status: yup
      .mixed<EmployeeStatusEnum>()
      .oneOf(Object.values(EmployeeStatusEnum))
      .required(requiredError),
    birthplace: yup.string().required(requiredError),
    birthdate: yup
      .date()
      .typeError("Introduzca una fecha válida")
      .required(requiredError),
    address: yup.string().required(requiredError),
    gender: yup
      .mixed<GenderEnum>()
      .oneOf(Object.values(GenderEnum))
      .required(requiredError),
    workPosition: yup.string().required(requiredError),
    civilStatus: yup
      .mixed<CivilStatusEnum>()
      .oneOf(Object.values(CivilStatusEnum))
      .required(requiredError),
    dominantHand: yup
      .mixed<DominantHandEnum>()
      .oneOf(Object.values(DominantHandEnum))
      .required(requiredError),
    profession: yup.string().required(requiredError),
  }) as unknown as yup.ObjectSchema<EmployeeFormData>;

  return validationSchema;
};
