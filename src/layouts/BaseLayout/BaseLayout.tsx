import { ReactNode } from "react";
import { useStyles } from "./BaseLayoutStyles";
import { Modal } from "@app/components/Modal";

interface Props {
  children: ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Modal />
      <div className={classes.container}>{children}</div>
    </>
  );
};

export { BaseLayout };
