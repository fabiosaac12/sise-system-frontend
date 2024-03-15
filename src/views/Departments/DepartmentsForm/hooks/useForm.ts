import { useFormik } from 'formik';
import { useValidationSchema } from './useValidationSchema';
import { DepartmentFormData } from '@app/models/department.model';
import { useDeparments } from '@app/providers/deparments';
import { useEffect } from 'react';

const defaultInitialValues = {
  name: '',
  clientId: '',
};

interface Props {
  initialValues?: DepartmentFormData;
  handleSubmit: (values: DepartmentFormData) => void;
}
export const useForm = ({
  initialValues = defaultInitialValues,
  handleSubmit,
}: Props) => {
  const validationSchema = useValidationSchema();
  const { catalogues } = useDeparments();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (formik.values.clientId) {
      catalogues.getDepartments(formik.values.clientId);

      formik.setFieldValue('departmentId', '');
    }
  }, [formik.values.clientId]);

  return formik;
};
