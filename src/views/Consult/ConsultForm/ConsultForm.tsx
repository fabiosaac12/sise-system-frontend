import { useStyles } from "../ConsultStyles";
import { FC } from "react";
import { useForm } from "../hooks/useForm";
import { Card, Box, Typography, Grid, Button } from "@mui/material";
import {
  ConsultFormData,
  DiagnosisEnum,
  TestEnum,
} from "@app/models/consult.model";
import { Select, TextField } from "@app/components/form";

type Props = {
  initialValues?: ConsultFormData;
  handleSubmit: (data: ConsultFormData) => void;
};

export const ConsultForm: FC<Props> = ({ initialValues, handleSubmit }) => {
  const classes = useStyles();
  const formik = useForm({ initialValues, handleSubmit });

  formik.handleBlur;

  return (
    <Box className={classes.container} m={0}>
      <Box className={classes.header} width="100%" mt={-5}>
        <Typography variant="h4" fontSize="1rem">
          Consulta
        </Typography>
      </Box>
      <Box className={classes.wrapper}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label="Examen"
              placeholder="Seleccionar..."
              name="test"
              options={Object.values(TestEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Cedula del Paciente"
              placeholder="Escribir..."
              name="idCard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label="Diagnóstico"
              placeholder="Seleccionar..."
              name="diagnosis"
              options={Object.values(DiagnosisEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Condiciones del Paciente"
              placeholder="Escribir..."
              name="pacientCondition"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Antecedentes Patológicos Personales"
              placeholder="Escribir..."
              name="personalPathologicalHistory"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Antecedentes Familiares"
              placeholder="Escribir..."
              name="familyHistory"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Antecedentes Ginecológicos"
              placeholder="Escribir..."
              name="gynecologicalHistory"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Antecedentes Laborales"
              placeholder="Escribir..."
              name="workHistory"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Hábitos tóxicos"
              placeholder="Escribir..."
              name="toxicHabits"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Reporte de exámenes de Laboratorio"
              placeholder="Escribir..."
              name="labTestReport"
            />
          </Grid>
          <Grid item xs={24} sm={12}>
            <Typography variant="h5" textAlign="center">
              Examen físico
            </Typography>
            <Card className={classes.card2}>
              <Grid
                container
                gap={1.5}
                justifyContent="center"
                alignContent="center"
              >
                <Grid item xs={4} sm={2.75} textAlign="center">
                  <Typography variant="h6">TCA</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    placeholder="Escribir"
                    name="TAResult"
                  />
                </Grid>
                <Grid item xs={4} sm={2.75} textAlign="center">
                  <Typography variant="h6">FC</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    placeholder="Escribir"
                    name="FCResult"
                  />
                </Grid>
                <Grid item xs={4} sm={2.75} textAlign="center">
                  <Typography variant="h6">SPO2</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    placeholder="Escribir"
                    name="SPO2Result"
                  />
                </Grid>
                <Grid item xs={4} sm={2.75} textAlign="center">
                  <Typography variant="h6">FR</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    placeholder="Escribir"
                    name="FRResult"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} textAlign="center">
                  <Typography variant="h6">Peso</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    placeholder="Escribir"
                    name="weight"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} textAlign="center">
                  <Typography variant="h6">Talla</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    placeholder="Escribir"
                    name="size"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} textAlign="center">
                  <Typography variant="h6">IMC</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    placeholder="Escribir"
                    name="IMCResult"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} textAlign="center">
                  <Typography variant="h6">Temperatura</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    placeholder="Escribir"
                    name="temperature"
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Ojos"
              placeholder="Escribir..."
              name="eyesDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Nariz"
              placeholder="Escribir..."
              name="noseAndEarsDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Boca y Garganta"
              placeholder="Escribir..."
              name="mouthAndThroatDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Cardiovascular"
              placeholder="Escribir..."
              name="cardiovascularDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Respiratorio"
              placeholder="Escribir..."
              name="respiratoryDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Abdomen"
              placeholder="Escribir..."
              name="abdomenDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Piel"
              placeholder="Escribir..."
              name="skinDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Cabeza y Cuello"
              placeholder="Escribir..."
              name="headAndNeckDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Hernias"
              placeholder="Escribir..."
              name="herniasDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Genitourinario"
              placeholder="Escribir..."
              name="genitourinaryDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Extremidades"
              placeholder="Escribir..."
              name="extremitiesDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Columna"
              placeholder="Escribir..."
              name="spineDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Neurológico"
              placeholder="Escribir..."
              name="neurologicalDescription"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label="Observaciones"
              placeholder="Escribir..."
              name="observations"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0} mb={-5}>
          <Grid item xs={12} mt={2} textAlign="right">
            <Button color="error" variant="text" sx={{ mr: 2 }}>
              Limpiar
            </Button>

            <Button color="primary" onClick={() => formik.handleSubmit()}>
              Crear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
