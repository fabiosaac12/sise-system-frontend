import { DepartmentFormData } from '@app/models/department.model';
import { useDeparments } from '@app/providers/deparments';
import * as yup from 'yup';

export const useValidationSchema = () => {
  const requiredError = 'Este campo es requerido';
  const duplicateError = 'El departamento ya existe';
  const { catalogues } = useDeparments();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .notOneOf(
        catalogues.departments
          ? catalogues.departments.map((item) => item.name)
          : [],
        duplicateError
      )
      .required(requiredError),
    clientId: yup.string().required(requiredError),
  }) as unknown as yup.ObjectSchema<DepartmentFormData>;

  return validationSchema;
};
