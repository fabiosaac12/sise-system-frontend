import { ModalConfig, ModalState } from "@app/models/components";
import { FC, PropsWithChildren, useState } from "react";
import { ModalContext } from "./ModalContext";

const initialConfig: ModalConfig = {
  closeable: true,
  open: false,
  content: null,
};

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<ModalConfig>(initialConfig);

  const open: ModalState["open"] = (config) => {
    setConfig({
      ...initialConfig,
      ...config,
      open: true,
    });
  };

  const close = () => {
    setConfig((config) => ({
      ...config,
      open: false,
    }));
  };

  const state: ModalState = {
    config,
    close,
    open,
  };

  return (
    <ModalContext.Provider value={state}>{children}</ModalContext.Provider>
  );
};
