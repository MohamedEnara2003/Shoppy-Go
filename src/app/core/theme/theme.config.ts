import { ThemeConfig } from '@angular/material/core';

export const lightTheme: ThemeConfig = {
  color: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff'
    },
    accent: {
      main: '#ff4081',
      light: '#ff80ab',
      dark: '#f50057',
      contrastText: '#ffffff'
    },
    warn: {
      main: '#f44336',
      light: '#ef5350',
      dark: '#d32f2f',
      contrastText: '#ffffff'
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
      card: '#ffffff',
      appBar: '#ffffff',
      dialog: '#ffffff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  shape: {
    borderRadius: 4
  }
}; 