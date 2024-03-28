import {
  EventDefinitionEnum,
  EventualityFormData,
} from "@app/models/eventuality.model";
import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { useValidationSchema } from "./useValidationSchema";

const defaultInitialValues: EventualityFormData = {
  idCard: "",
  eventDatetime: null as unknown as Dayjs,
  eventDate: null as unknown as Dayjs,
  injuredBodyPart: "",
  daysOfRest: "",
  eventPlace: "",
  typeOfInjury: "",
  eventDefinition: "" as EventDefinitionEnum,
  superiorEventDefinition: "" as EventDefinitionEnum,
  superiorStatement: "",
  witnessEventDefinition: "" as EventDefinitionEnum,
  witnessStatement: "",
  workerEventDefinition: "" as EventDefinitionEnum,
  workerStatement: "",
};

type Props = {
  initialValues?: EventualityFormData;
  handleSubmit: (values: EventualityFormData) => void;
};
export const useForm = ({
  initialValues = defaultInitialValues,
  handleSubmit,
}: Props) => {
  const validationSchema = useValidationSchema();
  const formik = useFormik<EventualityFormData>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return formik;
};
