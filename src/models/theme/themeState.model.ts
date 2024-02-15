import { ThemeModeEnum } from "@app/enums/theme";
import { Theme } from "@mui/material";

export type ThemeState = {
  theme: Theme;
  changeTheme: (mode: ThemeModeEnum) => void;
  switchTheme: () => void;
};
