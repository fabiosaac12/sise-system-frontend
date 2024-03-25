import {
  CivilStatusEnum,
  DominantHandEnum,
  EmployeeFormData,
  EmployeeStatusEnum,
  GenderEnum,
} from "@app/models/employee.model";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "./hooks/useForm";
import { Select, TextField } from "@app/components/form";
import { DatePicker } from "@app/components/form/DatePicker";
import { useEmployees } from "@app/providers/employees";
import { useModal } from "@app/providers/modal";
import { useStyles } from "./EmployeeFormStyles";

interface Props {
  initialValues?: EmployeeFormData;
  edit?: boolean;
  handleSubmit: (values: EmployeeFormData) => void;
}

export const EmployeeForm: FC<Props> = ({
  initialValues,
  handleSubmit,
  edit,
}) => {
  const modal = useModal();
  const classes = useStyles();

  const { catalogues } = useEmployees();

  const formik = useForm({
    initialValues,
    handleSubmit,
  });

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography variant="h6" fontSize="1rem">
          {edit ? "Editar empleado" : "Crear empleado"}
        </Typography>
        <Typography mt={0.5} variant="body2">
          {edit
            ? "Introduzca la información que se desea editar del empleado"
            : "Introduzca la información del empleado"}
        </Typography>
      </Box>
      <Box className={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label="Cliente"
              placeholder="Seleccionar..."
              name="clientId"
              options={catalogues.clients}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label="Departamento"
              placeholder="Seleccionar..."
              name="departmentId"
              options={catalogues.departments}
              disabled={!formik.values.clientId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Cédula"
              placeholder="Escribir..."
              name="idCard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Nombres"
              placeholder="Escribir..."
              name="firstNames"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Apellidos"
              placeholder="Escribir..."
              name="lastNames"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label="Estado"
              placeholder="Seleccionar..."
              name="status"
              options={Object.values(EmployeeStatusEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Cargo"
              placeholder="Escribir..."
              name="workPosition"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Lugar de nacimiento"
              placeholder="Escribir..."
              name="birthplace"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              formik={formik}
              label="Fecha de nacimiento"
              name="birthdate"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Dirección"
              placeholder="Escribir..."
              name="address"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label="Género"
              placeholder="Seleccionar..."
              name="gender"
              options={Object.values(GenderEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label="Estado civil"
              placeholder="Seleccionar..."
              name="civilStatus"
              options={Object.values(CivilStatusEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label="Mano dominante"
              placeholder="Seleccionar..."
              name="dominantHand"
              options={Object.values(DominantHandEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Profesión"
              placeholder="Escribir..."
              name="profession"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0}>
          <Grid item xs={12} mt={2} textAlign="right">
            <Button
              onClick={modal.close}
              color="error"
              variant="text"
              sx={{ mr: 2 }}
            >
              Cancelar
            </Button>

            <Button color="primary" onClick={formik.submitForm}>
              {edit ? "Editar" : "Crear"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
