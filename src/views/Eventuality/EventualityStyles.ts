import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  card: {
    padding: theme.spacing(4),
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(7),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
    flexGrow: 1,
    overflow: 'auto',
  },
}));
