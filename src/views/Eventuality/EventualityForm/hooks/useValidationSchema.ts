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
        .oneOf(Object.values(EventDefinitionEnum))
        .when('superiorStatement', {
          is: (value: string) => !!value == true,
          then: (schema) => schema.required('no especifico el tipo de evento'),
          otherwise: (schema) => schema.notRequired(),
        }),
      witnessStatement: yup.string(),
      witnessEventDefinition: yup
        .mixed()
        .oneOf(Object.values(EventDefinitionEnum))
        .when('witnessStatement', {
          is: (value: string) => !!value == true,
          then: (schema) => schema.required('no especifico el tipo de evento'),
          otherwise: (schema) => schema.notRequired(),
        }),
      workerStatement: yup.string(),
      workerEventDefinition: yup
        .mixed()
        .oneOf(Object.values(EventDefinitionEnum))
        .when('workerStatement', {
          is: (value: string) => !!value == true,
          then: (schema) => schema.required('no especifico el tipo de evento'),
          otherwise: (schema) => schema.notRequired(),
        }),
      typeOfInjury: yup.string().required(),
      injuredBodyPart: yup.string().required(requiredError),
    }) as unknown as yup.ObjectSchema<EventualityFormData>;

  return validationSchema;
};
