import { Container } from '@mui/material';
import { useStyles } from './MorbidityStyles';
import { MorbidityTable } from './MorbidityTable/MorbidityTable';

export const Morbidity = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='xl'>
      
        <MorbidityTable />
       
    </Container>
  );
};
