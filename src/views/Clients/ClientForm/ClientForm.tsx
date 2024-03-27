import { ClientFormData } from "@app/models/client.model";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "./hooks/useForm";
import { TextField } from "@app/components/form";
import { useModal } from "@app/providers/modal";
import { useStyles } from "./ClientFormStyles";

interface Props {
  initialValues?: ClientFormData;
  edit?: boolean;
  handleSubmit: (values: ClientFormData) => void;
}

export const ClientForm: FC<Props> = ({
  initialValues,
  handleSubmit,
  edit,
}) => {
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
          {edit ? "Editar cliente" : "Crear cliente"}
        </Typography>
        <Typography mt={0.5} variant="body2">
          {edit
            ? "Introduzca la información que se desea editar del cliente"
            : "Introduzca la información del cliente"}
        </Typography>
      </Box>
      <Box className={classes.body}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Cliente"
              placeholder="Escribir..."
              name="name"
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
