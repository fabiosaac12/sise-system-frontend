import { hexToRgba } from "@app/helpers/theme";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  color: "secondary" | "primary" | "success" | "error" | "info" | "warning";
  hideCancelButton?: boolean;
}

export const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
  container: {
    width: 460,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(4),
  },
  iconWrapper: ({ color }) => ({
    backgroundColor: hexToRgba(theme.palette[color].main, 0.1),
    padding: theme.spacing(2),
    display: "flex",
    borderRadius: 50,
  }),
  buttonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
  cancelButton: {
    marginRight: theme.spacing(2),
  },
  confirmButton: ({ hideCancelButton }) => ({
    width: hideCancelButton ? "50%" : undefined,
  }),
}));
