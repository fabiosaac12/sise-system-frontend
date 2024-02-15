import { Button, Card, Container, TextField } from "@mui/material";
import { useStyles } from "./LoginStyles";
import { useForm } from "./hooks/useForm";

export const Login = () => {
  const classes = useStyles();

  const formik = useForm();

  return (
    <Container className={classes.container} maxWidth="lg">
      <Card className={classes.card}>
        <TextField
          className={classes.input}
          fullWidth
          label="Correo electronico"
          placeholder="Correo electronico"
          {...formik.getFieldProps("email")}
          error={!!formik.submitCount && !!formik.errors.email}
          helperText={!!formik.submitCount && formik.errors.email}
        />
        <TextField
          className={classes.input}
          fullWidth
          type="password"
          label="Contraseña"
          placeholder="Contraseña"
          {...formik.getFieldProps("password")}
          error={!!formik.submitCount && !!formik.errors.password}
          helperText={!!formik.submitCount && formik.errors.password}
        />
        <Button onClick={() => formik.handleSubmit()} fullWidth>
          Iniciar sesion
        </Button>
      </Card>
    </Container>
  );
};
