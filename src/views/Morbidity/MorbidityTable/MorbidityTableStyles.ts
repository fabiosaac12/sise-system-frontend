import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    height: '400px',
    backgroundColor: '#FFFFFF',
  },

  checkBox: {
    color: theme.palette.secondary.dark,
  },
}));
