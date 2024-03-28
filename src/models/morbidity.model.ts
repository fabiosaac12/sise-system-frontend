import { Dayjs } from "dayjs";
import { Dispatch } from "react";
import { Pagination } from "./pagination";
import { Catalogue } from "./catalogue.model";

export enum DiagnosisTypeEnum {
  accidente = "ACCIDENTE",
  incidente = "INCIDENTE",
  preEmployee = "preEmpleo",
  preVacational = "preVacacional",
  postVacational = "postVacacional",
  egrese = "egreso",
  periodic = "periodico",
  preventive = "preventivo",
  diagnosticos = "diagno",
  cefalea = "Cefalea",
  controlDePresionArterial = "Control De Presión Arterial",
  epigastralgia = "Epigastralgi",
  irritaciónOcular = "Irritación ocular",
  artralgia = "Artralgia",
  mialgia = "Mialgia",
  sindromeViralSindromeEmetico = "Sindrome viral síndrome emetico",
  sindromeDiarreico = "Sindrome diarreic",
  sindromeVertiginoso = "Sindrome vertiginos",
  cervicalgia = "Cervicalgia",
  lumbalgia = "Lumbalgia",
  migraña = "Migraña",
  herida = "Herida",
  traumatismo = "Traumatismo",
  simcope = "Simcope",
  fractura = "Fractura",
  esguince = "Esguince",
  luxación = "Luxación",
  edema = "Edema",
  reaccionDeHipersensibilidad = "Reacción de hipersensibilidad",
  rinitis = "Rinitis",
  malestarGeneral = "Malestar general",
  hipertension = "Hipertensión",
  hipotension = "Hipotensión",
  gonalgia = "Gonalgia",
  pterigium = "Pterigium",
  infecciónRespiratoriaAlta = "Infección respiratoria alta",
  infecciónRespiratoriaBaja = "Infección respiratoria baja",
  piodermitis = "Piodermitis",
  escabiosis = "Escabiosi",
  estomatitis = "Estomatitis",
  sinusitis = "Sinusitis",
  bursitis = "Bursitis",
  ciatalgia = "Ciatalgia",
  sindromedelTunelCarpiano = "Sindrome del Tunel Carpian",
}
export type MorbidityForTable = {
  id: string;
  dateTime: string;
  employee: {
    idCard: string;
    firstNames: string;
    lastNames: string;
    birthdate: string;
    workPosition: string;
  };
  diagnosis: DiagnosisTypeEnum;
  treatment?: string;
  quantity?: string;
};

export type MorbidityFormData = {
  date: Dayjs;
  hour: Dayjs;
  idCard: string;
  diagnosis: DiagnosisTypeEnum;
  treatment?: string;
  quantity?: string;
};
export type Morbidity = {
  dateTime: Dayjs;
  idCard: string;
  diagnosis: DiagnosisTypeEnum;
  treatment?: string | null;
  quantity?: number | null;
};

export type MorbidityFilter = {
  date: string;
  clientId: string;
  workPosition: string;
};

export const initialMorbidityFilter: MorbidityFilter = {
  date: "",
  clientId: "",
  workPosition: "",
};

export type MorbidityState = {
  list?: MorbidityForTable[];
  filter: MorbidityFilter;
  pagination: Pagination;
  getAll: (props?: {
    filter?: Partial<MorbidityFilter>;
    pagination?: Partial<Pagination>;
  }) => Promise<MorbidityForTable[] | undefined>;
  createOne: (data: Morbidity) => Promise<boolean>;
  editOne: (id: string, data: Morbidity) => Promise<boolean>;
  deleteOne: (id: string) => Promise<boolean>;
  deleteMany: (id: string[]) => Promise<boolean>;
  applyFilters: (filter: Partial<MorbidityFilter>) => void;
  setPagination: Dispatch<React.SetStateAction<Pagination>>;
  catalogues: {
    clients: Catalogue;
    getClients: () => Promise<Catalogue | undefined>;
  };
};
