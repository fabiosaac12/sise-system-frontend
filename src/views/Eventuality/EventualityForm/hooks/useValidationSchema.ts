import {
  EventDefinitionEnum,
  EventualityFormData,
} from '@app/models/eventuality.model';

import * as yup from 'yup';

export const useValidationSchema = () => {
  const requiredError = 'Este campo es requerido';
  const validIdCardError = 'Introduzca un número de cédula válido';
  const validNumberError = 'Introduzca un número válido';

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
      daysOfRest: yup
        .number()
        .transform((_, originalValue) =>
          originalValue === '' ? undefined : +originalValue
        )
        .moreThan(0, validNumberError)
        .integer(validNumberError)
        .typeError(validNumberError)
        .required(requiredError),
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
    })
    .test(
      'campos-dependientes',
      'las declaraciones y el tipo de evento son dependientes entre sí',
      function (value) {
        const {
          workerStatement,
          workerEventDefinition,
          witnessStatement,
          witnessEventDefinition,
          superiorStatement,
          superiorEventDefinition,
        } = value;
        if (workerEventDefinition && !workerStatement) {
          return this.createError({
            path: 'workerStatement',
            message: 'Haga su declaración',
          });
        }
        if (!workerEventDefinition && workerStatement) {
          return this.createError({
            path: 'workerEventDefinition',
            message: 'Declare el tipo de evento',
          });
        }
        if (witnessEventDefinition && !witnessStatement) {
          return this.createError({
            path: 'witnessStatement',
            message: 'Haga su declaración',
          });
        }
        if (!witnessEventDefinition && witnessStatement) {
          return this.createError({
            path: 'witnessEventDefinition',
            message: 'Declare el tipo de evento',
          });
        }
        if (superiorEventDefinition && !superiorStatement) {
          return this.createError({
            path: 'superiorStatement',
            message: 'Haga su declaración',
          });
        }
        if (!superiorEventDefinition && superiorStatement) {
          return this.createError({
            path: 'superiorEventDefinition',
            message: 'Declare el tipo de evento',
          });
        }

        return true;
      }
    ) as unknown as yup.ObjectSchema<EventualityFormData>;

  return validationSchema;
};
