import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 2,
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));
