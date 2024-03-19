/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, Container, Typography } from '@mui/material';

import { useStyles } from './EventualityStyles';
import { EventualityForm } from './EventualityForm';
import { useEventuality } from '@app/providers/eventuality';

export const Eventuality = () => {
  const { createOne } = useEventuality();
  const classes = useStyles();

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
            const done = await createOne(data);
            console.log(data.eventDatetime);
            if (done) {
              alert('listo compadre');
            }
          }}
        />
      </Card>
    </Container>
  );
};
