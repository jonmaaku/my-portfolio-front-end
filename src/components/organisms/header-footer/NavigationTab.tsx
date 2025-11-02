import { Box, BoxProps } from '@mui/material';

export default function NavigationTabContainer(props: BoxProps & { open: boolean }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        // left: props.open ? 0 : '-100%',
        width: '250px',
        height: '100vh',
        bgcolor: 'background.paper',
        boxShadow: 3,
        transition: 'transform 0.3s ease-in-out',
        transform: props.open ? 'translateX(0)' : 'translateX(-100%)',
        zIndex: 999,
      }}
    >
      {props.children}
    </Box>
  );
}
