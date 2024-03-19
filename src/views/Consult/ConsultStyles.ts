import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { hexToRgba } from "@app/helpers/theme";

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
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.only("xs")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },
  card2: {
    width: "90%",
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.only("xs")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },
  header: {
    textAlign: "center",
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    borderBottom: `1px solid ${hexToRgba(theme.palette.text.primary, 0.1)}`,
  },
  wrapper: {
    paddingTop: theme.spacing(3),
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
