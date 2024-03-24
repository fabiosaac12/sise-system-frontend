import { ClientFormData } from "@app/models/client.model";
import { useValidationSchema } from "./useValidationSchema";
import { useFormik, FormikProps } from "formik";

interface Props {
  initialValues?: ClientFormData;
  handleSubmit: (values: ClientFormData) => void;
}

const defaultInitialValues: ClientFormData = {
  name: "",
  departments: [""],
};

export const useForm = ({
  initialValues = defaultInitialValues,
  handleSubmit,
}: Props): FormikProps<ClientFormData> => {
  const validationSchema = useValidationSchema();

  const formik = useFormik<ClientFormData>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return formik;
};
