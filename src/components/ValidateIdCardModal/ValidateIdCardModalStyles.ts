import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
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
