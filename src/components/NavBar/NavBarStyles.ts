import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 250,
    backgroundColor: '#FFFFFF',
    margin: 0,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: theme.spacing(3),
  },
  listItems: {
    height: '100%',
    position: 'relative',
  },
  logOutItem: {
    position: 'absolute',
    bottom: 0,
  },
}));
