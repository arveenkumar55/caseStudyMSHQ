import React, { createContext, useState, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

const themes = {
  UAE: {
    palette: {
      mode: 'light',
      primary: { main: '#008C45' },
      secondary: { main: '#FFD700' },
    },
  },
  India: {
    palette: {
      mode: 'light',
      primary: { main: '#FF9933' },
      secondary: { main: '#138808' },
    },
  },
  USA: {
    palette: {
      mode: 'light',
      primary: { main: '#3C3B6E' },
      secondary: { main: '#B22234' },
    },
  },
  UK: {
    palette: {
      mode: 'light',
      primary: { main: '#00247D' },
      secondary: { main: '#CF142B' },
    },
  },
};

export const ThemeProviderContext = ({ children }) => {
  const [country, setCountry] = useState('UAE');
  const [theme, setTheme] = useState(createTheme(themes[country]));

  useEffect(() => {
    setTheme(createTheme(themes[country]));
  }, [country]);

  return (
    <ThemeContext.Provider value={{ theme, setCountry }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
