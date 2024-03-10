import { ReactNode } from 'react';
import { useStyles } from './BaseLayoutStyles';
import { Navbar } from '@app/components/NavBar';

interface Props {
  children: ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Navbar />
      {children}
    </div>
  );
};

export { BaseLayout };
