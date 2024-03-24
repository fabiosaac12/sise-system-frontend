import { Dayjs } from "dayjs";

export enum TestEnum {
  preEmployee = "preEmpleo",
  preVacational = "preVacacional",
  postVacational = "postVacacional",
  egrese = "egreso",
  periodic = "periodico",
  preventive = "preventivo",
}

export enum DiagnosisEnum {
  fulfill = "CUMPLE",
  limited = "LIMITADO",
  fails = "NOCUMPLE",
}

export type ConsultFormData = {
  idCard: string;
  test: TestEnum;
  diagnosis: DiagnosisEnum;
  pacientCondition: string;
  personalPathologicalHistory: string;
  gynecologicalHistory: string;
  familyHistory: string;
  toxicHabits: string;
  workHistory: string;
  labTestReport: string;
  TAResult: string;
  FCResult: string;
  SPO2Result: string;
  FRResult: string;
  weight: string;
  size: string;
  IMCResult: string;
  temperature: string;
  skinDescription: string;
  headAndNeckDescription: string;
  eyesDescription: string;
  noseAndEarsDescription: string;
  mouthAndThroatDescription: string;
  cardiovascularDescription: string;
  respiratoryDescription: string;
  abdomenDescription: string;
  herniasDescription: string;
  genitourinaryDescription: string;
  extremitiesDescription: string;
  spineDescription: string;
  neurologicalDescription: string;
  observations: string;
};

export type Consult = {
  id: string;
  date: Dayjs;
  hour: Dayjs;
  idCard: number;
  firstNames: string;
  lastNames: string;
  test: TestEnum;
  diagnosis: DiagnosisEnum;
  pacientCondition: string;
  personalPathologicalHistory: string;
  gynecologicalHistory: string;
  familyHistory: string;
  toxicHabits: string;
  workHistory: string;
  labTestReport: string;
  TAResult: number;
  FCResult: number;
  SPO2Result: number;
  FRResult: number;
  weight: number;
  size: number;
  IMCResult: number;
  temperature: number;
  skinDescription: string;
  headAndNeckDescription: string;
  eyesDescription: string;
  noseAndEarsDescription: string;
  mouthAndThroatDescription: string;
  cardiovascularDescription: string;
  respiratoryDescription: string;
  abdomenDescription: string;
  herniasDescription: string;
  genitourinaryDescription: string;
  extremitiesDescription: string;
  spineDescription: string;
  neurologicalDescription: string;
  observations: string;
};

export type ConsultState = {
  createOne: (data: ConsultFormData) => Promise<boolean>;
  editOne: (id: string, data: ConsultFormData) => Promise<boolean>;
};
