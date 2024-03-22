import { useStyles } from "./consultFormStyles";
import { FC, useEffect, useState } from "react";
import { useForm } from "./hooks/useForm";
import {
  Card,
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  ConsultFormData,
  DiagnosisEnum,
  TestEnum,
} from "@app/models/consult.model";
import { Select, TextField } from "@app/components/form";
import { useModal } from "@app/providers/modal";
import { ValidateIdCardModal } from "@app/components/ValidateIdCardModal";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

type Props = {
  initialValues?: ConsultFormData;
  handleSubmit: (data: ConsultFormData) => void;
};

export const ConsultForm: FC<Props> = ({ initialValues, handleSubmit }) => {
  const classes = useStyles();
  const formik = useForm({ initialValues, handleSubmit });
  const modal = useModal();
  const [idValidate, setIdValidate] = useState(false);

  const gridItemsBasics = { xs: 12, sm: 12, md: 4, lg: 4, item: true };
  const gridItemsDescriptions = { xs: 12, sm: 12, md: 6, lg: 6, item: true };

  useEffect(() => {
    if (idValidate) {
      setIdValidate(false);
    }
  }, [formik.values.idCard]);

  formik.handleBlur;

  return (
    <Box className={classes.container}>
      <Box className={classes.body}>
        <Grid
          container
          display={"flex"}
          alignItems={"flex-end"}
          {...gridItemsBasics}
        >
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <Typography variant="h3" fontWeight={500}>
              Cédula del Paciente
            </Typography>
            <TextField
              formik={{
                ...formik,
              }}
              label=""
              name="idCard"
              placeholder="Escribir..."
            />
          </Box>

          <IconButton
            size="medium"
            onClick={() => {
              modal.open({
                content: (
                  <ValidateIdCardModal
                    idCard={formik.getFieldProps("idCard").value}
                    setIdValidate={setIdValidate}
                  />
                ),
              });
            }}
          >
            <PersonSearchIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Divider />
        <Typography variant="h3" fontWeight={500}>
          Datos preliminares
        </Typography>
        <Grid container spacing={3}>
          <Grid {...gridItemsBasics}>
            <Select
              formik={formik}
              label="Examen"
              disabled={!idValidate}
              placeholder="Seleccionar..."
              name="test"
              options={Object.values(TestEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid {...gridItemsBasics}>
            <Select
              formik={formik}
              label="Diagnóstico"
              disabled={!idValidate}
              placeholder="Seleccionar..."
              name="diagnosis"
              options={Object.values(DiagnosisEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid {...gridItemsBasics}>
            <TextField
              formik={formik}
              label="Condiciones del Paciente"
              placeholder="Escribir..."
              name="pacientCondition"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsBasics}>
            <TextField
              formik={formik}
              label="Antecedentes Patológicos Personales"
              placeholder="Escribir..."
              name="personalPathologicalHistory"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsBasics}>
            <TextField
              formik={formik}
              label="Antecedentes Familiares"
              placeholder="Escribir..."
              name="familyHistory"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsBasics}>
            <TextField
              formik={formik}
              label="Antecedentes Ginecológicos"
              placeholder="Escribir..."
              name="gynecologicalHistory"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsBasics}>
            <TextField
              formik={formik}
              label="Antecedentes Laborales"
              placeholder="Escribir..."
              name="workHistory"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsBasics}>
            <TextField
              formik={formik}
              label="Hábitos tóxicos"
              placeholder="Escribir..."
              name="toxicHabits"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsBasics}>
            <TextField
              formik={formik}
              label="Reporte de exámenes de Laboratorio"
              placeholder="Escribir..."
              name="labTestReport"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
        </Grid>
        <Divider />
        <Typography variant="h3" fontWeight={500} textAlign="initial">
          Examen físico
        </Typography>
        <Grid container display={"flex"}>
          <Grid
            item
            xs={24}
            sm={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card className={classes.card2} variant="outlined">
              <Grid
                container
                columnGap={10}
                justifyContent="center"
                alignContent="center"
              >
                <Grid item xs={6} sm={2.75} md={1.5} mb={3} textAlign="center">
                  <Typography variant="h6">TCA</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    textFieldProps={{ disabled: !idValidate }}
                    placeholder="Escribir..."
                    name="TAResult"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} md={1.5} mb={3} textAlign="center">
                  <Typography variant="h6">FC</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    textFieldProps={{ disabled: !idValidate }}
                    placeholder="Escribir..."
                    name="FCResult"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} md={1.5} mb={3} textAlign="center">
                  <Typography variant="h6">SPO2</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    textFieldProps={{ disabled: !idValidate }}
                    placeholder="Escribir..."
                    name="SPO2Result"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} md={1.5} mb={3} textAlign="center">
                  <Typography variant="h6">FR</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    textFieldProps={{ disabled: !idValidate }}
                    placeholder="Escribir..."
                    name="FRResult"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                columnGap={10}
                justifyContent="center"
                alignContent="center"
              >
                <Grid item xs={6} sm={2.75} md={1.5} mb={3} textAlign="center">
                  <Typography variant="h6">Peso</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    textFieldProps={{ disabled: !idValidate }}
                    placeholder="Escribir..."
                    name="weight"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} md={1.5} mb={3} textAlign="center">
                  <Typography variant="h6">Talla</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    textFieldProps={{ disabled: !idValidate }}
                    placeholder="Escribir..."
                    name="size"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} md={1.5} mb={3} textAlign="center">
                  <Typography variant="h6">IMC</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    placeholder="Escribir..."
                    name="IMCResult"
                  />
                </Grid>
                <Grid item xs={6} sm={2.75} md={1.5} mb={3} textAlign="center">
                  <Typography variant="h6">Temperatura</Typography>
                  <TextField
                    formik={formik}
                    label=""
                    textFieldProps={{ disabled: !idValidate }}
                    placeholder="Escribir..."
                    name="temperature"
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Divider />
        <Typography variant="h3" fontWeight={500}>
          Examinación
        </Typography>
        <Grid container spacing={3}>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Ojos"
              placeholder="Escribir..."
              name="eyesDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Nariz"
              placeholder="Escribir..."
              name="noseAndEarsDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Boca y Garganta"
              placeholder="Escribir..."
              name="mouthAndThroatDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Cardiovascular"
              placeholder="Escribir..."
              name="cardiovascularDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Respiratorio"
              placeholder="Escribir..."
              name="respiratoryDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Abdomen"
              placeholder="Escribir..."
              name="abdomenDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Piel"
              placeholder="Escribir..."
              name="skinDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Cabeza y Cuello"
              placeholder="Escribir..."
              name="headAndNeckDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Hernias"
              placeholder="Escribir..."
              name="herniasDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Genitourinario"
              placeholder="Escribir..."
              name="genitourinaryDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Extremidades"
              placeholder="Escribir..."
              name="extremitiesDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Columna"
              placeholder="Escribir..."
              name="spineDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Neurológico"
              placeholder="Escribir..."
              name="neurologicalDescription"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
          <Grid {...gridItemsDescriptions}>
            <TextField
              formik={formik}
              label="Observaciones"
              placeholder="Escribir..."
              name="observations"
              textFieldProps={{
                multiline: true,
                rows: 3,
                disabled: !idValidate,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0}>
          <Grid item xs={12} mt={2} textAlign="right">
            <Button
              color="inherit"
              variant="text"
              sx={{ mr: 2 }}
              onClick={() => {
                formik.resetForm();
              }}
            >
              Limpiar
            </Button>

            <Button
              color="primary"
              onClick={() => formik.handleSubmit()}
              disabled={!idValidate}
            >
              Crear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
