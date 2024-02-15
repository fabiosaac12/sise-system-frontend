import { ThemeModeEnum } from "@app/enums/theme";
import { Theme } from "@mui/material";
import { palette } from ".";

export const components = (mode: ThemeModeEnum): Theme["components"] => ({
  MuiButton: {
    defaultProps: {
      variant: "outlined",
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: palette(mode).text?.primary,
      },
    },
  },
});
