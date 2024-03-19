import { useEventuality } from '@app/providers/eventuality';
import { Box, CircularProgress, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FormikProps } from 'formik';
import { FC, useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { EmployeeData } from '@app/models/eventuality.model';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      width: '250px',
    },
    display: 'flex',
    flexDirection: 'column',

    width: '400px',
  },
  loaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
type Props = {
  idCard: number;
  formik: FormikProps<'idCard'>;
};
export const ValidateIdCardModal: FC<Props> = ({ idCard, formik }) => {
  const classes = useStyles();
  const { getEmployee } = useEventuality();
  const [employee, setEmployee] = useState<EmployeeData>();
  const [state, setState] = useState('pending');
  const [carga, setCarga] = useState('Cargando');
  const [response, setResponse] = useState(
    'Espere unos segundo mientras comprobamos le cedula del usuario'
  );
  let index = 0;
  useEffect(() => {
    const intervalId = setInterval(() => {
      const etapas = ['Cargando.', 'Cargando..', 'Cargando...'];
      setCarga(etapas[index]);

      if (index === 2) {
        index = 0;
      } else {
        index++;
      }
    }, 500);

    setTimeout(async () => {
      const apiResponse = await getEmployee(idCard);

      if (apiResponse) {
        setResponse(`El empleado a sido encontrado satisfactoriamente.`);
        setEmployee(apiResponse);
        setState('succesfully');
      } else {
        setResponse('No se ha podido encontrar el usuario solicitado');
        setState('fail');
        formik.setFieldValue('idCard', '');
      }
      clearInterval(intervalId);
    }, 4000);
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.loaderWrapper}>
        {state === 'pending' ? (
          <>
            <CircularProgress size={'4.5rem'} />{' '}
            <Typography variant='h6' fontSize='1rem'>
              {carga}
            </Typography>
          </>
        ) : state === 'succesfully' ? (
          <>
            <CheckCircleOutlineIcon
              sx={{ color: 'green', fontSize: '4.5rem' }}
            />
            <Typography variant='h6' fontSize={'1.3rem'}>
              SE CONSIGUIO!!!
            </Typography>
          </>
        ) : (
          <Typography>Error...</Typography>
        )}
      </Box>

      <Box className={classes.descriptionContainer}>
        <Typography>{response}</Typography>

        {employee && (
          <>
            <Typography>Nombres: {employee?.firstNames}</Typography>
            <Typography>Apellidos: {employee?.lastNames}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};
