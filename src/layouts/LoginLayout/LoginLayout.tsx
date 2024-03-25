import { ReactNode } from 'react';
import { useStyles } from './LoginLayoutStyles';

interface Props {
  children: ReactNode;
}

export const LoginLayout = ({ children }: Props) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};
