import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    // maxHeight: `calc(100vh - ${theme.spacing(6)})`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
  },
  body: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxHeight: '90%',

    overflowY: 'auto',
  },
  statementWrapper: {
    padding: '1rem',
    [theme.breakpoints.down('lg')]: {
      padding: '.5rem',
    },
    [theme.breakpoints.up('xl')]: {
      padding: '1rem',
    },
  },
}));
