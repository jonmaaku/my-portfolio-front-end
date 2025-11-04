'use client';
// import '@/styles/globals.css';
import { GlobalStyles, ThemeProvider, useColorScheme } from '@mui/material';
import type { AppProps } from 'next/app';
// import { SessionProvider } from 'next-auth/react';
import { iconVariant, SlydynToast } from '@/config/customSnackbar';
import AuthProvider from '@/contexts/AuthContext/AuthProvider';
import { SnackbarProvider } from 'notistack';
import lightTheme from '@/config/themes/lightTheme';
import darkTheme from '@/config/themes/darkTheme';
import { useEffect, useMemo, useState } from 'react';
import CustomThemeProvider from '@/contexts/CustomThemeContext/CustomThemeProvider';
import { useCustomThemeContext } from '@/contexts/CustomThemeContext/CustomThemeContext';

function CustomComponent({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const { mode } = useCustomThemeContext();
  const theme = useMemo(() => {
    if (isClient && typeof window !== 'undefined' && mode === 'system') {
      const isDarkMode = window?.matchMedia('(prefers-color-scheme: dark)')?.matches;

      return isDarkMode ? darkTheme : lightTheme;
    }
    return mode === 'light' ? lightTheme : mode === 'dark' ? darkTheme : lightTheme;
  }, [mode, isClient]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default } }} />

      <AuthProvider>
        <SnackbarProvider
          Components={{
            success: SlydynToast,
            error: SlydynToast,
          }}
          iconVariant={iconVariant}
          maxSnack={1}
        >
          {/* <SessionProvider session={session}> */}
          <Component {...pageProps} />
          {/* </SessionProvider> */}
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <CustomThemeProvider>
      <CustomComponent {...props} />
    </CustomThemeProvider>
  );
}
