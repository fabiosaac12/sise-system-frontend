import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    display: 'grid',
    gridTemplateColumns: '1fr calc(100vw - 250px)',
    gridTemplateRows: '1fr',
    gridTemplateAreas: `
      "header" "content"
    `,
  },
}));
