import { Theme } from "@mui/material";

const containerPadding = (theme: Theme) => ({
  padding: theme.spacing(4),

  [theme.breakpoints.up("xl")]: {
    padding: theme.spacing(7),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down("xs")]: {
    padding: theme.spacing(1),
  },
});

export const predefinedStyles = {
  containerPadding,
};
