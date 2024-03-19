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
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflowY: 'auto',
  },
}));
