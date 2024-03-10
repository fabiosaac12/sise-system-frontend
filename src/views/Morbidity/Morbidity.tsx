import { Box, Container } from '@mui/material';
import { useStyles } from './MorbidityStyles';
import { MorbidityTable } from './MorbidityTable/MorbidityTable';
import { MorbidityFilter } from './MorbidityFilter/MorbidityFilter';

export const Morbidity = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='xl'>
      <Box>
        <MorbidityTable />
        <MorbidityFilter />
      </Box>
    </Container>
  );
};
