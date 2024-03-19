import { FC } from 'react';
import { useStyles } from './eventualityFormStyles';
import { Box, Button, Divider, Grid } from '@mui/material';
import { DatePicker, Select, TextField } from '@app/components/form';
import { useForm } from './hooks';
import {
  EventDefinitionEnum,
  EventualityFormData,
} from '@app/models/eventuality.model';
import { useModal } from '@app/providers/modal';
import { ValidateIdCardModal } from './ValidateIdCardModal';
import { FormikProps } from 'formik';
import { TimePicker } from '@app/components/form/TimePicker';

type Props = {
  initialValues?: EventualityFormData;
  handleSubmit: (data: EventualityFormData) => void;
};
export const EventualityForm: FC<Props> = ({ initialValues, handleSubmit }) => {
  const classes = useStyles();
  const formik = useForm({ initialValues, handleSubmit });
  const modal = useModal();
  formik.handleBlur;
  return (
    <Box className={classes.container}>
      <Box className={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={{
                ...formik,
                handleBlur: () => {
                  modal.open({
                    content: (
                      <ValidateIdCardModal
                        idCard={formik.getFieldProps('idCard').value}
                        formik={formik as unknown as FormikProps<'idCard'>}
                      />
                    ),
                  });
                },
              }}
              label='Cedula del usuario'
              name='idCard'
              placeholder='cedula del empleado'
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label='Tipo de eventualidad'
              name='eventDefinition'
              placeholder='seleccionar'
              options={Object.values(EventDefinitionEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label='Lugar del suceso'
              name='eventPlace'
              placeholder='Describir...'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              formik={formik}
              label='Hora del suceso'
              name='eventDatetime'
            ></DatePicker>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              formik={formik}
              label='Hora del suceso'
              name='eventDatetime'
            ></TimePicker>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label='tipo de lesion'
              name='typeOfInjury'
              placeholder='Describir...'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label='Parte del cuerpo lesionada'
              name='injuredBodyPart'
              placeholder='Describir...'
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label='Declaracion del trabajador'
              name='workerStatement'
              placeholder='Describir..'
              textFieldProps={{ multiline: true, rows: 3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label='Tipo de evento'
              disabled={!formik.values.workerStatement}
              name='workerEventDefinition'
              placeholder='Seleccionar'
              options={Object.values(EventDefinitionEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label='Declaracion del del Testigo'
              name='witnessStatement'
              placeholder='Describir..'
              textFieldProps={{ multiline: true, rows: 3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label='Tipo de evento'
              disabled={!formik.values.witnessStatement}
              name='witnessEventDefinition'
              placeholder='Seleccionar'
              options={Object.values(EventDefinitionEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label='Declaracion del sel Superior'
              name='superiorStatement'
              placeholder='Describir..'
              textFieldProps={{ multiline: true, rows: 3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              disabled={!formik.values.superiorStatement}
              label='Tipo de evento'
              name='superiorEventDefinition'
              placeholder='Seleccionar'
              options={Object.values(EventDefinitionEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0}>
          <Grid item xs={12} mt={2} textAlign='right'>
            <Button color='primary' onClick={formik.submitForm}>
              Crear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
