import { FC, PropsWithChildren, useState } from "react";
import {
  Theme,
  createTheme,
  ThemeProvider as ThemeProviderMui,
} from "@mui/material";
import { components, palette, shape } from "@app/config/theme";
import { ThemeModeEnum } from "@app/enums/theme";
import { ThemeState } from "@app/models/theme";
import { ThemeContext } from "./ThemeContext";

const generateTheme = (mode: ThemeModeEnum) =>
  createTheme({
    palette: palette(mode),
    shape,
    components: components(mode),
  });

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const defaultMode: ThemeModeEnum =
    (localStorage.getItem("mode") as ThemeModeEnum) ||
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? ThemeModeEnum.dark
      : ThemeModeEnum.light);

  const [theme, setTheme] = useState<Theme>(generateTheme(defaultMode));

  const changeTheme = (mode: ThemeModeEnum) => {
    const newTheme = generateTheme(mode);

    localStorage.setItem("mode", mode);

    setTheme(newTheme);
  };

  const switchTheme = () => {
    changeTheme(
      theme.palette.mode === ThemeModeEnum.dark
        ? ThemeModeEnum.light
        : ThemeModeEnum.dark
    );
  };

  const state: ThemeState = {
    theme,
    changeTheme,
    switchTheme,
  };

  return (
    <ThemeContext.Provider value={state}>
      <ThemeProviderMui theme={theme}>{children}</ThemeProviderMui>
    </ThemeContext.Provider>
  );
};
