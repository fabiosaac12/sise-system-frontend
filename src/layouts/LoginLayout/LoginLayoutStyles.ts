import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
  },
}));
