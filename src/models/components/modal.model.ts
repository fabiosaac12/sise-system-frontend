import { ReactNode } from "react";

export type ModalConfig = {
  open: boolean;
  closeable?: boolean;
  content: ReactNode;
};

export type ModalState = {
  config: ModalConfig;
  open: (config: Omit<ModalConfig, "open">) => void;
  close: () => void;
};
