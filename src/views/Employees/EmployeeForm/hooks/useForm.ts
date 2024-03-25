import {
  CivilStatusEnum,
  DominantHandEnum,
  EmployeeFormData,
  EmployeeStatusEnum,
  GenderEnum,
} from "@app/models/employee.model";
import { useValidationSchema } from "./useValidationSchema";
import { useFormik, FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { useEmployees } from "@app/providers/employees";
import { Dayjs } from "dayjs";

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
  birthdate: null as unknown as Dayjs,
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
  const { catalogues } = useEmployees();
  const validationSchema = useValidationSchema();

  const formik = useFormik<EmployeeFormData>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const mounted = useRef(false);

  useEffect(() => {
    if (formik.values.clientId) {
      catalogues.getDepartments(formik.values.clientId);

      if (mounted.current) {
        formik.setFieldValue("departmentId", "");
      }
    }

    mounted.current = true;
  }, [formik.values.clientId]);

  return formik;
};
