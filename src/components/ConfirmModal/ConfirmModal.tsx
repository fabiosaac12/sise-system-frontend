import { FC } from "react";
import {
  Box,
  Button,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useModal } from "@app/providers/modal";
import { useStyles } from "./ConfirmModalStyles";
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
  const modal = useModal();
  const classes = useStyles({ color, hideCancelButton });

  return (
    <Box className={classes.container}>
      <div className={classes.iconWrapper}>
        <Icon color={color} fontSize="large" />
      </div>
      <Typography mt={3} variant="h4">
        {title}
      </Typography>
      <Typography mt={3} variant="body1">
        {description}
      </Typography>
      <Box className={classes.buttonContainer}>
        {!hideCancelButton && (
          <Button
            onClick={modal.close}
            className={classes.cancelButton}
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
          className={classes.confirmButton}
          color={color}
        >
          {confirmButtonText}
        </Button>
      </Box>
    </Box>
  );
};
