import { FC, useEffect, useState } from 'react';
import { useStyles } from './eventualityFormStyles';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { DatePicker, Select, TextField } from '@app/components/form';
import { useForm } from './hooks';
import {
  EventDefinitionEnum,
  EventualityFormData,
} from '@app/models/eventuality.model';
import { useModal } from '@app/providers/modal';
import { ValidateIdCardModal } from '../../../components/ValidateIdCardModal';
import { TimePicker } from '@app/components/form/TimePicker';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

type Props = {
  initialValues?: EventualityFormData;
  handleSubmit: (data: EventualityFormData) => void;
};
export const EventualityForm: FC<Props> = ({ initialValues, handleSubmit }) => {
  const classes = useStyles();
  const formik = useForm({ initialValues, handleSubmit });
  const modal = useModal();
  const [idValidate, setIdValidate] = useState(false);

  const gridItemsCommonProps = { xs: 12, sm: 12, md: 6, lg: 4, item: true };

  useEffect(() => {
    if (idValidate) {
      setIdValidate(false);
    }
  }, [formik.values.idCard]);
  return (
    <Box className={classes.container}>
      <Box className={classes.body}>
        <Typography variant='h3' fontWeight={500}>
          Cédula del empleado
        </Typography>
        <Grid
          container
          display={'flex'}
          alignItems={'flex-end'}
          {...gridItemsCommonProps}
        >
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <TextField
              formik={{
                ...formik,
              }}
              label=''
              name='idCard'
              placeholder='cedula del empleado'
            />
          </Box>

          <IconButton
            size='medium'
            onClick={() => {
              modal.open({
                content: (
                  <ValidateIdCardModal
                    idCard={formik.getFieldProps('idCard').value}
                    setIdValidate={setIdValidate}
                  />
                ),
              });
            }}
          >
            <PersonSearchIcon fontSize='large' />
          </IconButton>
        </Grid>
        <Divider />
        <Typography variant='h3' fontWeight={500}>
          Datos Generales
        </Typography>
        <Grid container spacing={3}>
          <Paper></Paper>
          <Grid {...gridItemsCommonProps}>
            <Select
              formik={formik}
              label='Tipo de eventualidad'
              disabled={!idValidate}
              name='eventDefinition'
              placeholder='seleccionar'
              options={Object.values(EventDefinitionEnum).map((value) => ({
                id: value,
                name: value,
              }))}
            />
          </Grid>
          <Grid {...gridItemsCommonProps}>
            <TextField
              formik={formik}
              label='Lugar del suceso'
              textFieldProps={{ disabled: !idValidate }}
              name='eventPlace'
              placeholder='Describir...'
            />
          </Grid>
          <Grid {...gridItemsCommonProps}>
            <DatePicker
              formik={formik}
              label='fecha del suceso'
              datePickerProps={{ disabled: !idValidate }}
              name='eventDatetime'
            ></DatePicker>
          </Grid>
          <Grid {...gridItemsCommonProps}>
            <TimePicker
              formik={formik}
              label='Hora del suceso'
              timePickerProps={{ disabled: !idValidate }}
              name='eventDate'
            ></TimePicker>
          </Grid>
          <Grid {...gridItemsCommonProps}>
            <TextField
              formik={formik}
              label='tipo de lesion'
              textFieldProps={{ disabled: !idValidate }}
              name='typeOfInjury'
              placeholder='Describir...'
            />
          </Grid>
          <Grid {...gridItemsCommonProps}>
            <TextField
              formik={formik}
              label='Parte del cuerpo lesionada'
              textFieldProps={{ disabled: !idValidate }}
              name='injuredBodyPart'
              placeholder='Describir...'
            />
          </Grid>
        </Grid>
        <Divider />
        <Typography variant='h3' fontWeight={500} marginBottom={1}>
          Declaraciones
        </Typography>

        <Paper variant='outlined' sx={{ paddingTop: 3, position: 'relative' }}>
          <Typography
            variant='h4'
            fontWeight={500}
            sx={{
              paddingRight: 1,
              position: 'absolute',
              top: '-15px',
              left: '10px',
              backgroundColor: 'white',
            }}
          >
            Trabajador
          </Typography>
          <Grid container spacing={3} className={classes.statementWrapper}>
            <Grid {...gridItemsCommonProps} lg={4}>
              <Select
                formik={formik}
                label='Tipo de evento'
                disabled={!idValidate}
                name='workerEventDefinition'
                placeholder='Seleccionar'
                options={Object.values(EventDefinitionEnum).map((value) => ({
                  id: value,
                  name: value,
                }))}
              />
            </Grid>
            <Grid {...gridItemsCommonProps} lg={8}>
              <TextField
                formik={formik}
                label='Declaracion del trabajador'
                name='workerStatement'
                placeholder='Describir..'
                textFieldProps={{
                  multiline: true,
                  rows: 3,
                  disabled: !idValidate,
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper variant='outlined' sx={{ paddingTop: 3, position: 'relative' }}>
          <Typography
            variant='h4'
            fontWeight={500}
            sx={{
              paddingRight: 1,
              position: 'absolute',
              top: '-15px',
              left: '10px',
              backgroundColor: 'white',
            }}
          >
            Testigo
          </Typography>
          <Grid
            container
            spacing={3}
            padding={1}
            className={classes.statementWrapper}
          >
            <Grid {...gridItemsCommonProps} lg={4}>
              <Select
                formik={formik}
                label='Tipo de evento'
                disabled={!idValidate}
                name='witnessEventDefinition'
                placeholder='Seleccionar'
                options={Object.values(EventDefinitionEnum).map((value) => ({
                  id: value,
                  name: value,
                }))}
              />
            </Grid>
            <Grid {...gridItemsCommonProps} lg={8}>
              <TextField
                formik={formik}
                label='Declaracion del del Testigo'
                name='witnessStatement'
                placeholder='Describir..'
                textFieldProps={{
                  multiline: true,
                  rows: 3,
                  disabled: !idValidate,
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper variant='outlined' sx={{ paddingTop: 3, position: 'relative' }}>
          <Typography
            variant='h4'
            fontWeight={500}
            sx={{
              paddingRight: 1,
              position: 'absolute',
              top: '-15px',
              left: '10px',
              backgroundColor: 'white',
            }}
          >
            Superior
          </Typography>
          <Grid
            container
            spacing={3}
            padding={1}
            className={classes.statementWrapper}
          >
            <Grid {...gridItemsCommonProps} lg={4}>
              <Select
                formik={formik}
                disabled={!idValidate}
                label='Tipo de evento'
                name='superiorEventDefinition'
                placeholder='Seleccionar'
                options={Object.values(EventDefinitionEnum).map((value) => ({
                  id: value,
                  name: value,
                }))}
              />
            </Grid>
            <Grid {...gridItemsCommonProps} lg={8}>
              <TextField
                formik={formik}
                label='Declaracion del sel Superior'
                name='superiorStatement'
                placeholder='Describir..'
                textFieldProps={{
                  multiline: true,
                  rows: 3,
                  disabled: !idValidate,
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            color='inherit'
            variant='text'
            onClick={() => {
              formik.resetForm();
            }}
          >
            limpiar
          </Button>
          <Button
            color='primary'
            onClick={formik.submitForm}
            disabled={!idValidate}
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
