import { ThemeModeEnum } from "@app/enums/theme";
import { Theme } from "@mui/material";
import { palette, shape } from ".";
import { hexToRgba } from "@app/helpers/theme";

export const components = (mode: ThemeModeEnum): Theme["components"] => ({
  MuiButton: {
    styleOverrides: {
      containedPrimary: {
        "&:hover": {
          backgroundColor: hexToRgba(palette(mode).primary!.dark, 0.5),
        },
      },
    },
    defaultProps: {
      variant: "contained",
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: palette(mode).text?.primary,
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: "filled",
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        backgroundColor: palette(mode).primary?.light,
        borderBottomLeftRadius: shape.borderRadius,
        borderBottomRightRadius: shape.borderRadius,
        "&:hover": {
          backgroundColor: palette(mode).primary?.light,
        },
        "&.Mui-focused": {
          backgroundColor: palette(mode).primary?.light,
        },
        "&::after": {
          display: "none",
        },
        "&::before": {
          display: "none",
        },
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        "&.Mui-focused": {
          color: palette(mode).primary?.dark,
        },
      },
    },
  },
});
