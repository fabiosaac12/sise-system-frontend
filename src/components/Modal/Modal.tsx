import { FC } from "react";
import {
  Card,
  Modal as ModalMui,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useModal } from "@app/providers/modal";

export const Modal: FC = () => {
  const modal = useModal();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <ModalMui
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(xs ? 1 : 2),
      }}
      open={modal.config.open}
      onClose={() => (modal.config.closeable ? modal.close() : undefined)}
    >
      <Card
        sx={{
          maxHeight: `calc(100vh - ${theme.spacing(6)})`,
          overflow: "auto",
        }}
      >
        {modal.config.content}
      </Card>
    </ModalMui>
  );
};
