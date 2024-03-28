import { FC, useEffect, useState } from "react";
import { useStyles } from "./MorbidityFormStyles";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  AlertColor,
} from "@mui/material";
import { DatePicker, Select, TextField } from "@app/components/form";
import { useForm } from "./hooks";

import { useModal } from "@app/providers/modal";
import { TimePicker } from "@app/components/form/TimePicker";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
  MorbidityFormData,
  DiagnosisTypeEnum,
} from "@app/models/morbidity.model";
import { useEmployees } from "@app/providers/employees";

type Props = {
  initialValues?: MorbidityFormData;
  handleSubmit: (data: MorbidityFormData) => void;
  edit?: boolean;
};
export const MorbidityForm: FC<Props> = ({
  initialValues,
  handleSubmit,
  edit,
}) => {
  const classes = useStyles();
  const formik = useForm({ initialValues, handleSubmit });
  const modal = useModal();
  const [idValidate, setIdValidate] = useState(edit);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");
  const { getEmployee } = useEmployees();

  const gridItemsCommonProps = { xs: 12, sm: 12, md: 6, lg: 4, item: true };

  if (!edit) {
    useEffect(() => {
      if (idValidate) {
        setIdValidate(false);
        setAlertSeverity("info");
      }
    }, [formik.values.idCard]);
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography variant="h6" fontSize="1rem">
          {edit ? "Editar morbilidad" : "Crear morbilidad"}
        </Typography>
        <Typography mt={0.5} variant="body2">
          {edit
            ? "Introduzca la información que se desea editar de la morbilidad"
            : "Introduzca la información de la morbilidad"}
        </Typography>
      </Box>
      <Box className={classes.body}>
        <Grid container display={"flex"} alignItems={"flex-end"}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <TextField
              formik={{
                ...formik,
              }}
              label="Cédula"
              name="idCard"
              placeholder="Cédula del empleado"
              textFieldProps={{ disabled: edit }}
            />
          </Box>

          <IconButton
            size="medium"
            onClick={async () => {
              const idCard = formik.values.idCard;
              const response = await getEmployee(+idCard);

              if (response) {
                setIdValidate(true);
                setAlertSeverity("success");
              } else {
                setIdValidate(false);
                setAlertSeverity("error");
              }
            }}
          >
            <PersonSearchIcon fontSize="large" />
          </IconButton>
        </Grid>

        {!edit ? (
          <Alert sx={{ mb: 3, mt: 3 }} severity={alertSeverity}>
            {alertSeverity === "success"
              ? "El empleado introducido se encuentra registrado"
              : alertSeverity === "error"
              ? "El empleado introducido no se encuentra registrado"
              : "Presione el boton para buscar al usuario"}
          </Alert>
        ) : (
          ""
        )}

        <Grid container spacing={3}>
          <Grid {...gridItemsCommonProps}>
            <DatePicker
              formik={formik}
              label="Fecha"
              datePickerProps={{ disabled: !idValidate }}
              name="date"
            ></DatePicker>
          </Grid>
          <Grid {...gridItemsCommonProps}>
            <TimePicker
              formik={formik}
              label="Hora"
              timePickerProps={{ disabled: !idValidate }}
              name="hour"
            ></TimePicker>
          </Grid>
          <Grid {...gridItemsCommonProps}>
            <Select
              formik={formik}
              label="Diagnostico"
              name="diagnosis"
              placeholder="Seleccionar..."
              options={Object.values(DiagnosisTypeEnum).map((value) => ({
                id: value,
                name: value,
              }))}
              disabled={!idValidate || edit}
            />
          </Grid>
          <Grid {...gridItemsCommonProps}>
            <TextField
              formik={formik}
              label="Tratamiento"
              textFieldProps={{ disabled: !idValidate }}
              name="treatment"
              placeholder="Describir..."
            />
          </Grid>
          <Grid {...gridItemsCommonProps}>
            <TextField
              formik={formik}
              label="Cantidad"
              textFieldProps={{ disabled: !idValidate }}
              name="quantity"
              placeholder="Describir..."
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={modal.close}
            color="error"
            variant="text"
            sx={{ mr: 2 }}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={formik.submitForm}
            disabled={!idValidate}
          >
            {edit ? "Editar" : "Crear"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
