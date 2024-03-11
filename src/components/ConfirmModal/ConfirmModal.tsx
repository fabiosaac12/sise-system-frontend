import { FC } from "react";
import {
  Box,
  Button,
  SvgIconTypeMap,
  Typography,
  useTheme,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useModal } from "@app/providers/modal";
import { hexToRgba } from "@app/helpers/theme";
interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  color: "secondary" | "primary" | "success" | "error" | "info" | "warning";
  title: string;
  description: string;
  confirmButtonText: string;
  hideCancelButton?: boolean;
  confirmButtonAction?: () => void;
}

export const ConfirmModal: FC<Props> = ({
  Icon,
  color,
  title,
  description,
  confirmButtonText,
  confirmButtonAction,
  hideCancelButton,
}) => {
  const theme = useTheme();
  const modal = useModal();

  return (
    <Box
      width={460}
      maxWidth={"100%"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: theme.spacing(4),
      }}
    >
      <div
        style={{
          backgroundColor: hexToRgba(theme.palette[color].main, 0.1),
          padding: theme.spacing(2),
          display: "flex",
          borderRadius: 50,
        }}
      >
        <Icon color={color} fontSize="large" />
      </div>
      <Typography mt={3} variant="h4">
        {title}
      </Typography>
      <Typography mt={3} variant="body1">
        {description}
      </Typography>
      <Box
        mt={3}
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      >
        {!hideCancelButton && (
          <Button
            onClick={modal.close}
            style={{ marginRight: theme.spacing(2) }}
            fullWidth
            color={color}
            variant="outlined"
          >
            Cancelar
          </Button>
        )}
        <Button
          onClick={() => {
            confirmButtonAction && confirmButtonAction();
            modal.close();
          }}
          fullWidth={!hideCancelButton}
          style={{
            width: hideCancelButton ? "50%" : undefined,
          }}
          color={color}
        >
          {confirmButtonText}
        </Button>
      </Box>
    </Box>
  );
};
