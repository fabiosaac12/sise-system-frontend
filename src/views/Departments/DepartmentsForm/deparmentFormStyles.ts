import { hexToRgba } from '@app/helpers/theme';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxHeight: `calc(100vh - ${theme.spacing(6)})`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    width: 650,
    maxWidth: '100%',
  },
  header: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    borderBottom: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)}`,
  },
  body: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: '90%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflowY: 'auto',
  },
}));
