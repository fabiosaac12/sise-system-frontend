import {
  CivilStatusEnum,
  DominantHandEnum,
  EmployeeFormData,
  EmployeeStatusEnum,
  GenderEnum,
} from "@app/models/employee.model";
import { useValidationSchema } from "./useValidationSchema";
import { useFormik, FormikProps } from "formik";

interface Props {
  initialValues?: EmployeeFormData;
  handleSubmit: (values: EmployeeFormData) => void;
}

const defaultInitialValues: EmployeeFormData = {
  clientId: "",
  departmentId: "",
  firstNames: "",
  lastNames: "",
  idCard: "",
  status: "" as EmployeeStatusEnum,
  birthplace: "",
  birthdate: null as unknown as Date,
  address: "",
  gender: "" as GenderEnum,
  workPosition: "",
  civilStatus: "" as CivilStatusEnum,
  dominantHand: "" as DominantHandEnum,
  profession: "",
};

export const useForm = ({
  initialValues = defaultInitialValues,
  handleSubmit,
}: Props): FormikProps<EmployeeFormData> => {
  const validationSchema = useValidationSchema();

  const formik = useFormik<EmployeeFormData>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return formik;
};
