import {
  Box,
  Button,
  Card,
  Container,
  InputAdornment,
  TextField,
  Typography,
  ButtonBase,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useStyles } from "./LoginStyles";
import { useForm } from "./hooks/useForm";
import { images } from "@app/assets";

export const Login = () => {
  const classes = useStyles();

  const formik = useForm();

  return (
    <Container className={classes.container} maxWidth="xs">
      <Card className={classes.card}>
        <Box className={classes.wrapper}>
          <img className={classes.logo} src={images.logo} />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            className={classes.input}
            label="Correo electronico"
            placeholder="Correo electronico"
            {...formik.getFieldProps("email")}
            error={!!formik.submitCount && !!formik.errors.email}
            helperText={!!formik.submitCount && formik.errors.email}
          />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            className={classes.input}
            type="password"
            label="Contraseña"
            placeholder="Contraseña"
            {...formik.getFieldProps("password")}
            error={!!formik.submitCount && !!formik.errors.password}
            helperText={!!formik.submitCount && formik.errors.password}
          />
          <ButtonBase className={classes.forgotPasswordButton}>
            <Typography color="primary.dark" variant="caption">
              ¿Olvidaste tu contraseña?
            </Typography>
          </ButtonBase>
          <Button
            className={classes.button}
            onClick={() => formik.handleSubmit()}
          >
            Ingresar
          </Button>
        </Box>
      </Card>
    </Container>
  );
};
