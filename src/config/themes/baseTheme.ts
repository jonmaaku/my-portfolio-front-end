// import '@fontsource/cooper-hewitt/400.css';
// import '@fontsource/cooper-hewitt/500.css';
// import '@fontsource/cooper-hewitt/600.css';
// import '@fontsource/cooper-hewitt/700.css';
// import '@fontsource/roboto-condensed/400.css';
// import '@fontsource/roboto-condensed/500.css';
import { createTheme, PaletteColorOptions, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    dark: true;
    light: true;
  }
}
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    mbs: true;
    mbm: true;
    mbl: true;
    tbs: true;
    tbm: true;
    tbl: true;
    dts: true;
    dtm: true;
    dtl: true;
  }
  interface Theme {
    color: {
      primary: {
        jaffa: string;
        flamingo: string;
      };
      secondary: {
        tallPoppy: string;
        saffron: string;
        breakerBay: string;
      };
      tertiary: {};
      neutral: {
        white: string;
        codGray: string;
        accent1: string;
        accent2: string;
        tundora: string;
        screenColor: string;
      };
      sso: {
        facebook: string;
        google: string;
        apple: string;
      };
    };
  }
  interface PaletteOptions {}
  // allow configuration using `createTheme`
  interface ButtonOwnPropsColorOverrides {}

  interface TypographyVariants {
    body3: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

const breakpointsTheme = createTheme({
  breakpoints: {
    values: {
      mbs: 0,
      mbm: 375,
      mbl: 556,
      tbs: 768,
      tbm: 900,
      tbl: 1000,
      dts: 1100,
      dtm: 1200,
      dtl: 1400,

      xs: 0, // mobile
      sm: 600, // tablet
      md: 900, // laptop
      lg: 1200, // desktop
      xl: 1536, // large desktop
    },
  },
});

const basetheme = createTheme({
  ...breakpointsTheme,

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {},
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        color: '#0057FF',
        variant: 'body1',
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        size: 25,
        color: 'inherit',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#B0B0B0', // Default border color
            },
            '&:hover fieldset': {
              borderColor: '#0057FF', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0057FF', // Border color when focused
              borderWidth: '2px', // Thicker border when focused
            },
          },
        },
      },
    },
  },

  typography: {
    fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
    h1: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 500,
      lineHeight: '63.7px',
      fontSize: '79.3px',
      textTransform: 'uppercase',
      color: '#212121',
    },
    h2: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 500,
      fontSize: '49px',
      lineHeight: '63.7px',
      textTransform: 'uppercase',
      color: '#212121',
    },
    h3: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 500,
      fontSize: '39px',
      textTransform: 'uppercase',
      lineHeight: '50.7px',
      color: '#212121',
    },
    h4: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 500,
      fontSize: '31px',
      textTransform: 'uppercase',
      color: '#212121',
      lineHeight: '40.3px',
    },
    h5: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 500,
      fontSize: '25px',
      textTransform: 'uppercase',
      lineHeight: '32.5px',
      color: '#212121',
    },
    h6: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 500,
      fontSize: '20px',
      textTransform: 'uppercase',
      lineHeight: '26px',
      color: '#212121',
    },
    subtitle1: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '26px',
      color: '#212121',
    },
    subtitle2: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 400,
      color: '#212121',
    },
    body1: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 400,
      fontSize: '16px',
      color: '#212121',
      [breakpointsTheme.breakpoints.up('xs')]: {
        fontSize: '12px',
      },
    },
    body2: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 400,
      fontSize: '13px',
      color: '#212121',
      [breakpointsTheme.breakpoints.up('xs')]: {
        fontSize: '12px',
      },
      [breakpointsTheme.breakpoints.up('lg')]: {
        fontSize: '14px',
      },
    },
    caption: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: '14px',
      color: '#212121',
      [breakpointsTheme.breakpoints.up('xs')]: {
        fontSize: '12px',
      },
      [breakpointsTheme.breakpoints.up('lg')]: {
        fontSize: '14px',
      },
    },
    button: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 400,
      color: '#212121',
    },
    overline: {
      fontFamily: 'Cooper Hewitt, "Space Grotesk", sans-serif',
      fontWeight: 400,
      fontSize: '',
      color: '#212121',
    },
  },
  colorSchemes: {
    dark: true,
    light: true,
  },
});

export default basetheme;
