import {
  DiagnosisTypeEnum,
  MorbidityFormData,
} from "@app/models/morbidity.model";
import { useValidationSchema } from "./useValidationSchema";
import { useFormik, FormikProps } from "formik";
import { Dayjs } from "dayjs";

interface Props {
  initialValues?: MorbidityFormData;
  handleSubmit: (values: MorbidityFormData) => void;
}

const defaultInitialValues: MorbidityFormData = {
  date: null as unknown as Dayjs,
  hour: null as unknown as Dayjs,
  idCard: "",
  diagnosis: "" as DiagnosisTypeEnum,
  quantity: "",
  treatment: "",
};

export const useForm = ({
  initialValues = defaultInitialValues,
  handleSubmit,
}: Props): FormikProps<MorbidityFormData> => {
  const validationSchema = useValidationSchema();

  const formik = useFormik<MorbidityFormData>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return formik;
};
