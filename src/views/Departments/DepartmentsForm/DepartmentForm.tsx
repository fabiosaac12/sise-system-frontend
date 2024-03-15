import { DepartmentFormData } from '@app/models/department.model';
import { useForm } from './hooks/useForm';
import { useStyles } from './deparmentFormStyles';
import { useModal } from '@app/providers/modal';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Select, TextField } from '@app/components/form';
import { useDeparments } from '@app/providers/deparments';

interface Props {
  initialValues?: DepartmentFormData;
  edit?: boolean;
  handleSubmit: (values: DepartmentFormData) => void;
}

export const DepartmentForm = ({
  handleSubmit,
  initialValues,
  edit,
}: Props) => {
  const modal = useModal();
  const classes = useStyles();
  const { catalogues } = useDeparments();

  const formik = useForm({ initialValues, handleSubmit });

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography variant='h6' fontSize='1rem'>
          {edit ? 'Editar Departamento' : 'Crear Departamento'}
        </Typography>
        <Typography mt={0.5} variant='body2'>
          {edit
            ? 'Introduzca la información que se desea editar del departamento'
            : 'Introduzca la información del departamento'}
        </Typography>
      </Box>
      <Box className={classes.body}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Select
              formik={formik}
              label='Cliente'
              placeholder='Seleccionar...'
              name='clientId'
              options={catalogues.clients}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              formik={formik}
              label='Nombre del departamento'
              placeholder='Escribir...'
              name='name'
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0}>
          <Grid item xs={12} mt={2} textAlign='right'>
            <Button
              onClick={modal.close}
              color='error'
              variant='text'
              sx={{ mr: 2 }}
            >
              Cancelar
            </Button>

            <Button color='primary' onClick={formik.submitForm}>
              {edit ? 'Editar' : 'Crear'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
