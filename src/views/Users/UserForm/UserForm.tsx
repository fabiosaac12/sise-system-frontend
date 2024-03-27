import { UserFormData } from "@app/models/user.model";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "./hooks/useForm";
import { TextField } from "@app/components/form";
import { useModal } from "@app/providers/modal";
import { useStyles } from "./UserFormStyles";

interface Props {
  initialValues?: UserFormData;
  edit?: boolean;
  handleSubmit: (values: UserFormData) => void;
}

export const UserForm: FC<Props> = ({ initialValues, handleSubmit, edit }) => {
  const modal = useModal();
  const classes = useStyles();

  const formik = useForm({
    initialValues,
    handleSubmit,
  });

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography variant="h6" fontSize="1rem">
          {edit ? "Editar usuario" : "Crear usuario"}
        </Typography>
        <Typography mt={0.5} variant="body2">
          {edit
            ? "Introduzca la información que se desea editar del usuario"
            : "Introduzca la información del usuario"}
        </Typography>
      </Box>
      <Box className={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Nombres"
              placeholder="Escribir..."
              name="firstName"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Apellidos"
              placeholder="Escribir..."
              name="lastName"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Correo Electrónico"
              placeholder="Escribir..."
              name="email"
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
