import {
  EventDefinitionEnum,
  EventualityFormData,
} from '@app/models/eventuality.model';

import * as yup from 'yup';

export const useValidationSchema = () => {
  const requiredError = 'Este campo es requerido';
  const validIdCardError = 'Introduzca un número de cédula válido';

  const validationSchema = yup
    .object()
    .shape<{ [K in keyof EventualityFormData]: any }>({
      idCard: yup
        .number()
        .transform((_, originalValue) =>
          originalValue === '' ? undefined : +originalValue
        )
        .moreThan(0, validIdCardError)
        .lessThan(100000000, validIdCardError)
        .integer(validIdCardError)
        .typeError(validIdCardError)
        .required(requiredError),
      eventDefinition: yup
        .mixed()
        .oneOf(Object.values(EventDefinitionEnum))
        .required(requiredError),
      eventPlace: yup.string().required(requiredError),
      eventDatetime: yup.date().required(requiredError),
      eventDate: yup.date().required(requiredError),
      superiorStatement: yup.string(),
      superiorEventDefinition: yup
        .mixed()
        .oneOf(Object.values(EventDefinitionEnum)),
      witnessStatement: yup.string(),
      witnessEventDefinition: yup
        .mixed()
        .oneOf(Object.values(EventDefinitionEnum)),
      workerStatement: yup.string(),
      workerEventDefinition: yup
        .mixed()
        .oneOf(Object.values(EventDefinitionEnum)),
      typeOfInjury: yup.string().required(requiredError),
      injuredBodyPart: yup.string().required(requiredError),
    }) as unknown as yup.ObjectSchema<EventualityFormData>;

  return validationSchema;
};
