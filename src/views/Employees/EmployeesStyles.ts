import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  selectedLength: number;
}

export const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  card: {
    padding: theme.spacing(4),
    minHeight: "100%",
    flexGrow: 1,
  },
  tableHeader: ({ selectedLength }) => ({
    backgroundColor: selectedLength
      ? theme.palette.primary.dark
      : theme.palette.background.paper,
    border: "1px solid",
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  invisibleButton: {
    width: 0,
    paddingLeft: 0,
    paddingRight: 0,
    pointerEvents: "none",
    "& .MuiSvgIcon-root": {
      width: 0,
    },
  },
}));
