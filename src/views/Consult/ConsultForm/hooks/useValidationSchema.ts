import {
  TestEnum,
  DiagnosisEnum,
  ConsultFormData,
} from "@app/models/consult.model";
import * as yup from "yup";

export const useValidationSchema = () => {
  const requiredError = "Este campo es requerido";
  const validIdCardError = "Introduzca un número de cédula válido";
  const validNumber = "Introduzca un valor numérico";

  const validationSchema = yup.object().shape({
    idCard: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .moreThan(0, validIdCardError)
      .lessThan(100000000, validIdCardError)
      .integer(validIdCardError)
      .typeError(validIdCardError)
      .required(requiredError),
    test: yup
      .mixed<TestEnum>()
      .oneOf(Object.values(TestEnum))
      .required(requiredError),
    diagnosis: yup
      .mixed<DiagnosisEnum>()
      .oneOf(Object.values(DiagnosisEnum))
      .required(requiredError),
    pacientCondition: yup.string().required(requiredError),
    personalPathologicalHistory: yup.string().required(requiredError),
    gynecologicalHistory: yup.string().required(requiredError),
    familyHistory: yup.string().required(requiredError),
    toxicHabits: yup.string().required(requiredError),
    workHistory: yup.string().required(requiredError),
    labTestReport: yup.string().required(requiredError),
    TAResult: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .integer(validNumber)
      .typeError(validNumber)
      .required(requiredError),
    FCResult: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .integer(validNumber)
      .typeError(validNumber)
      .required(requiredError),
    SPO2Result: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .integer(validNumber)
      .typeError(validNumber)
      .required(requiredError),
    FRResult: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .integer(validNumber)
      .typeError(validNumber)
      .required(requiredError),
    weight: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .integer(validNumber)
      .typeError(validNumber)
      .required(requiredError),
    size: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .integer(validNumber)
      .typeError(validNumber)
      .required(requiredError),
    IMCResult: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .integer(validNumber)
      .typeError(validNumber)
      .required(requiredError),
    temperature: yup
      .number()
      .transform((_, originalValue) =>
        originalValue === "" ? undefined : +originalValue
      )
      .integer(validNumber)
      .typeError(validNumber)
      .required(requiredError),
    skinDescription: yup.string(),
    headAndNeckDescription: yup.string(),
    eyesDescription: yup.string(),
    noseAndEarsDescription: yup.string(),
    mouthAndThroatDescription: yup.string(),
    cardiovascularDescription: yup.string(),
    respiratoryDescription: yup.string(),
    abdomenDescription: yup.string(),
    herniasDescription: yup.string(),
    genitourinaryDescription: yup.string(),
    extremitiesDescription: yup.string(),
    spineDescription: yup.string(),
    neurologicalDescription: yup.string(),
    observations: yup.string(),
  }) as unknown as yup.ObjectSchema<ConsultFormData>;

  return validationSchema;
};
