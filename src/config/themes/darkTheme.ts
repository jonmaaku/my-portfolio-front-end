// import '@fontsource/cooper-hewitt/400.css';
// import '@fontsource/cooper-hewitt/500.css';
// import '@fontsource/cooper-hewitt/600.css';
// import '@fontsource/cooper-hewitt/700.css';
// import '@fontsource/roboto-condensed/400.css';
// import '@fontsource/roboto-condensed/500.css';
import { createTheme, PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import basetheme from './baseTheme';

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#FFC107', // Mustard
    light: '#1A237E', // Navy Blue
    dark: '#010101', // Beige
  },
  secondary: {
    main: '#1A237E', // Navy Blue
    dark: '#0D133D',
    light: '#3949AB',
  },
  background: {
    default: '#121212', // Black
    paper: '#212121', // Deep Grey
  },
  text: {
    primary: '#F5F5DC', // Beige
    secondary: '#FFC107', // Mustard
  },
};

const darkTheme = createTheme({
  ...basetheme,
  palette: {
    ...darkPalette,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          styles: {
            backgroundColor: '#212121',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: '#FFC107',
            color: '#010101',
            '&:hover': {
              backgroundColor: '#FFB300',
            },
          },
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
    ...basetheme.typography,
    h1: {
      ...basetheme.typography.h1,
      color: '#F5F5DC',
    },
    h2: {
      ...basetheme.typography.h2,
      color: '#F5F5DC',
    },
    h3: {
      ...basetheme.typography.h3,
      color: '#F5F5DC',
    },
    h4: {
      ...basetheme.typography.h4,
      color: '#F5F5DC',
    },
    h5: {
      ...basetheme.typography.h5,
      color: '#F5F5DC',
    },
    h6: {
      ...basetheme.typography.h6,
      color: '#F5F5DC',
    },
    subtitle1: {
      ...basetheme.typography.subtitle1,
      color: '#F5F5DC',
    },
    subtitle2: {
      ...basetheme.typography.subtitle2,
      color: '#F5F5DC',
    },
    body1: {
      ...basetheme.typography.body1,
      color: '#F5F5DC',
    },
    body2: {
      ...basetheme.typography.body2,
      color: '#F5F5DC',
    },
    caption: {
      ...basetheme.typography.caption,

      color: '#F5F5DC',
    },
    button: {
      ...basetheme.typography.button,
      color: '#F5F5DC',
    },
    overline: {
      ...basetheme.typography.overline,
      color: '#F5F5DC',
    },
  },
  colorSchemes: {
    dark: true,
  },
});

export default darkTheme;
