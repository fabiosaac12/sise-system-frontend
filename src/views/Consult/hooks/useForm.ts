import {
  TestEnum,
  DiagnosisEnum,
  ConsultFormData,
} from "@app/models/consult.model";
import { useValidationSchema } from "./useValidationSchema";
import { useFormik, FormikProps } from "formik";

interface Props {
  initialValues?: ConsultFormData;
  handleSubmit: (values: ConsultFormData) => void;
}

const defaultInitialValues: ConsultFormData = {
  idCard: "",
  test: "" as TestEnum,
  diagnosis: "" as DiagnosisEnum,
  pacientCondition: "",
  personalPathologicalHistory: "",
  gynecologicalHistory: "",
  familyHistory: "",
  toxicHabits: "",
  workHistory: "",
  labTestReport: "",
  TABResult: "",
  FCResult: "",
  SPO2Result: "",
  FRResult: "",
  weight: "",
  size: "",
  IMCResult: "",
  temperature: "",
  skinDescription: "",
  headAndNeckDescription: "",
  eyesDescription: "",
  noseAndEarsDescription: "",
  mouthAndThroatDescription: "",
  cardiovascularDescription: "",
  respiratoryDescription: "",
  abdomenDescription: "",
  herniasDescription: "",
  genitourinaryDescription: "",
  extremitiesDescription: "",
  spineDescription: "",
  neurologicalDescription: "",
  observations: "",
};

export const useForm = ({
  initialValues = defaultInitialValues,
  handleSubmit,
}: Props): FormikProps<ConsultFormData> => {
  const validationSchema = useValidationSchema();

  const formik = useFormik<ConsultFormData>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return formik;
};
