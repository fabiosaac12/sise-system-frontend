/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, Container, Typography } from '@mui/material';

import { useStyles } from './EventualityStyles';
import { EventualityForm } from './EventualityForm';
import { useEventuality } from '@app/providers/eventuality';
import dayjs from 'dayjs';
import { useModal } from '@app/providers/modal';
import { ConfirmModal } from '@app/components/ConfirmModal';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const Eventuality = () => {
  const { createOne } = useEventuality();
  const classes = useStyles();
  const modal = useModal();

  return (
    <Container className={classes.container} maxWidth='xl'>
      <Card className={classes.card}>
        <Box mb={3}>
          <Typography variant='h1' fontWeight={500}>
            Eventualidad
          </Typography>
          <Typography mt={1} variant='body1'>
            En este apartado se crean las eventualidades de los empleados
          </Typography>
        </Box>
        <EventualityForm
          handleSubmit={async (data) => {
            let year = data.eventDatetime.toDate().getFullYear();
            let month = data.eventDatetime.toDate().getMonth();
            let day = data.eventDatetime.toDate().getDate();
            let hours = data.eventDate.toDate().getHours();
            let minutes = data.eventDate.toDate().getMinutes();

            let date = new Date(year, month, day, hours, minutes);

            const done = await createOne({
              ...data,
              superiorEventDefinition: data.superiorEventDefinition
                ? data.superiorEventDefinition
                : null,
              witnessEventDefinition: data.witnessEventDefinition
                ? data.witnessEventDefinition
                : null,
              workerEventDefinition: data.workerEventDefinition
                ? data.workerEventDefinition
                : null,
              eventDatetime: dayjs(date),
            });
            // console.log(`${year}, ${month}, ${day}, ${hours}, ${minutes}`);

            if (done) {
              modal.open({
                content: (
                  <ConfirmModal
                    Icon={CheckCircleOutlineIcon}
                    color={'success'}
                    title={'EXITO'}
                    description={
                      'La eventualidad a sido registrada satisfactoriamente'
                    }
                    confirmButtonText={'aceptar'}
                  ></ConfirmModal>
                ),
              });
            } else {
              modal.open({
                content: (
                  <ConfirmModal
                    Icon={ErrorIcon}
                    color={'error'}
                    title={'ERROR'}
                    description={'no se ha podido generar la eventualidad...'}
                    confirmButtonText={'aceptar'}
                  ></ConfirmModal>
                ),
              });
            }
          }}
        />
      </Card>
    </Container>
  );
};
