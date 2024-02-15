import { LoginData } from "@app/models/auth";
import { useAuth } from "@app/providers/auth";
import { useFormik } from "formik";
import * as yup from "yup";

export const useForm = () => {
  const auth = useAuth();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Este campo es requerido")
      .email("Debe ser un correo electronico valido"),
    password: yup.string().required("Este campo es requerido"),
  });

  const initialValues: LoginData = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      auth.login(values);
    },
  });

  return formik;
};
