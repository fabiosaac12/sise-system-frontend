import { ThemeModeEnum } from '@app/enums/theme';
import { Theme } from '@mui/material';

export const palette = (mode: ThemeModeEnum): Partial<Theme['palette']> =>
  mode === ThemeModeEnum.light
    ? {
        mode: 'light',
        primary: {
          light: '#fdebf3',
          main: '#fab1d0',
          dark: '#b84165',
          contrastText: '#1C2025',
        },
        secondary: {
          light: '#fdebf3',
          main: '#fab1d0',
          dark: '#b84165',
          contrastText: '#1C2025',
        },
        common: {
          black: '#0B0D0E',
          white: '#fff',
        },
        text: {
          primary: '#1C2025',
          secondary: '#434D5B',
          disabled: 'rgba(0, 0, 0, 0.38)',
        },
        error: {
          main: '#EB0014',
          light: '#FF99A2',
          dark: '#C70011',
          contrastText: '#fff',
        },
        success: {
          main: '#1AA251',
          light: '#6AE79C',
          dark: '#1AA251',
          contrastText: '#fff',
        },
        warning: {
          main: '#DEA500',
          light: '#FFDC48',
          dark: '#AB6800',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
          main: '#0288d1',
          light: '#03a9f4',
          dark: '#01579b',
          contrastText: '#fff',
        },
        background: {
          paper: '#fff',
          default: '#ffe0ed',
        },
        action: {
          active: 'rgba(0, 0, 0, 0.54)',
          hover: 'rgba(0, 0, 0, 0.04)',
          hoverOpacity: 0.04,
          selected: 'rgba(0, 0, 0, 0.08)',
          selectedOpacity: 0.08,
          disabled: 'rgba(0, 0, 0, 0.26)',
          disabledBackground: 'rgba(0, 0, 0, 0.12)',
          disabledOpacity: 0.38,
          focus: 'rgba(0, 0, 0, 0.12)',
          focusOpacity: 0.12,
          activatedOpacity: 0.12,
        },
      }
    : {
        mode: 'dark',
        primary: {
          main: '#3399FF',
          light: '#66B2FF',
          dark: '#004C99',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        secondary: {
          main: '#1F262E',
          contrastText: '#2F3A46',
          light: 'rgb(75, 81, 87)',
          dark: 'rgb(21, 26, 32)',
        },
        background: {
          default: '#101418',
          paper: 'rgba(20, 26, 31, 0.8)',
        },
        common: {
          black: '#0B0D0E',
          white: '#fff',
        },
        text: {
          primary: '#fff',
          secondary: '#B0B8C4',
          disabled: 'rgba(255, 255, 255, 0.5)',
        },
        error: {
          main: '#EB0014',
          light: '#FF99A2',
          dark: '#C70011',
          contrastText: '#fff',
        },
        success: {
          main: '#1DB45A',
          light: '#6AE79C',
          dark: '#1AA251',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        warning: {
          main: '#DEA500',
          light: '#FFDC48',
          dark: '#AB6800',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
          main: '#29b6f6',
          light: '#4fc3f7',
          dark: '#0288d1',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        action: {
          active: '#fff',
          hover: 'rgba(255, 255, 255, 0.08)',
          hoverOpacity: 0.08,
          selected: 'rgba(255, 255, 255, 0.16)',
          selectedOpacity: 0.16,
          disabled: 'rgba(255, 255, 255, 0.3)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
          disabledOpacity: 0.38,
          focus: 'rgba(255, 255, 255, 0.12)',
          focusOpacity: 0.12,
          activatedOpacity: 0.24,
        },
      };
