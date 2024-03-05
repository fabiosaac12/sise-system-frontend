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
    width: "100%",
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.only("xs")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  forgotPasswordButton: {
    cursor: "pointer",
    alignSelf: "flex-start",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5),
    marginTop: `-${theme.spacing(1)}`,
    transition: theme.transitions.create("background-color"),
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  button: {
    marginTop: theme.spacing(2.5),
    alignSelf: "center",
  },
}));
