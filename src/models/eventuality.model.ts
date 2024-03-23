import { Dayjs } from 'dayjs';

export enum EventDefinitionEnum {
  accidente = 'ACCIDENTE',
  incidente = 'INCIDENTE',
}
export type EventualityFormData = {
  idCard: string;
  eventDefinition: EventDefinitionEnum;
  eventPlace: string;
  eventDatetime: Dayjs;
  eventDate: Dayjs;
  typeOfInjury: string;
  injuredBodyPart: string;
  daysOfRest: number;
  workerStatement: string;
  workerEventDefinition: EventDefinitionEnum | null;
  witnessStatement: string;
  witnessEventDefinition: EventDefinitionEnum | null;
  superiorStatement: string;
  superiorEventDefinition: EventDefinitionEnum | null;
};
export type Eventuality = {
  idCard: string;
  eventDefinition: EventDefinitionEnum;
  eventPlace: string;
  eventDatetime: Dayjs;
  typeOfInjury: string;
  injuredBodyPart: string;
  daysOfRest: number;
  workerStatement: string;
  workerEventDefinition: EventDefinitionEnum | null;
  witnessStatement: string;
  witnessEventDefinition: EventDefinitionEnum | null;
  superiorStatement: string;
  superiorEventDefinition: EventDefinitionEnum | null;
};

export type EventualityState = {
  createOne: (data: Eventuality) => Promise<boolean>;
};
