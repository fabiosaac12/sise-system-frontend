import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    // maxHeight: `calc(100vh - ${theme.spacing(6)})`,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
  },
  body: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxHeight: "90%",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflowY: "auto",
  },
  card2: {
    maxWidth: "800px",
    minWidth: "200px",
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    variant: "outlined",
    [theme.breakpoints.only("xs")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },
}));
