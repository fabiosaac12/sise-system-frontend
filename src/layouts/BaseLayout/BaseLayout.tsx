import { ReactNode } from "react";
import { useStyles } from "./BaseLayoutStyles";

interface Props {
  children: ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export { BaseLayout };
