import { UserFormData } from "@app/models/user.model";
import { FormikProps, useFormik } from "formik";
import { useValidationSchema } from "./useValidationSchema";

interface Props {
  initialValues?: UserFormData;
  handleSubmit: (values: UserFormData) => void;
}

const defaultInitialValues: UserFormData = {
  email: "",
  firstName: "",
  lastName: "",
};

export const useForm = ({
  initialValues = defaultInitialValues,
  handleSubmit,
}: Props): FormikProps<UserFormData> => {
  const validationSchema = useValidationSchema();

  const formik = useFormik<UserFormData>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return formik;
};
