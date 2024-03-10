import { MorbidityFormData } from "@app/models/morbidity.model";
import { useValidationSchema } from "./useValidationSchema";
import { useFormik, FormikProps } from "formik";

interface Props {
  initialValues?: MorbidityFormData;
  handleSubmit: (values: MorbidityFormData) => void;
}

const defaultInitialValues: MorbidityFormData = {
  date: null as unknown as Date,
  hour: "",
  firstNames: "",
  lasNames: "",
  idCard: "",
  diagnosis: "",
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
