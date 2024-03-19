import {
  EventDefinitionEnum,
  EventualityFormData,
} from '@app/models/eventuality.model';
import { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import { useValidationSchema } from './useValidationSchema';
import { useModal } from '@app/providers/modal';
import { ValidateIdCardModal } from '../ValidateIdCardModal';

const defaultInitialValues: EventualityFormData = {
  idCard: '',
  eventDatetime: null as unknown as Dayjs,
  injuredBodyPart: 'pitooo',
  eventPlace: '',
  typeOfInjury: '',
  eventDefinition: '' as EventDefinitionEnum,
  superiorEventDefinition: null,
  superiorStatement: '',
  witnessEventDefinition: null,
  witnessStatement: '',
  workerEventDefinition: null,
  workerStatement: '',
};

type Props = {
  initialValues?: EventualityFormData;
  handleSubmit: (values: EventualityFormData) => void;
};
export const useForm = ({
  initialValues = defaultInitialValues,
  handleSubmit,
}: Props) => {
  const modal = useModal();
  const validationSchema = useValidationSchema();
  const formik = useFormik<EventualityFormData>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  // formik.getFieldProps('idCard').onBlur(() => {
  //   modal.open({
  //     content: (
  //       <ValidateIdCardModal idCard={formik.getFieldProps('idCard').value} />
  //     ),
  //   });
  // });

  return formik;
};
