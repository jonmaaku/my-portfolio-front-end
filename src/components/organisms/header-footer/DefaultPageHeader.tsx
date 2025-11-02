import { useAuthContext } from '@/contexts/AuthContext/AuthContext';
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NavigationTabContainer from './NavigationTab';
import dynamic from 'next/dist/shared/lib/dynamic';

export const MINIMUM_TOP_HEADER_HEIGHT = '80px';

const DefaultThemeSelect = dynamic(
  () => import('@/components/molecules/Select/DefaultThemeSelect'),
  { ssr: false }
);

export default function DefaultPageHeader() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover-date-range' : undefined;

  return (
    <Box
      gridArea="header"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      maxWidth="100vw"
      height={MINIMUM_TOP_HEADER_HEIGHT}
      // paddingY={2}
      // paddingX={4.5}
      position="fixed"
      left={0}
      right={0}
      top={0}
      zIndex={998}
      bgcolor="inherit"
      padding={2}
    >
      <Box display={{ xs: 'block', md: 'none' }}>
        <Button onClick={() => setAnchorEl(anchorEl ? null : document.createElement('button'))}>
          {!open && <KeyboardArrowRight />}
        </Button>
        <NavigationTabContainer open={open}>
          <Stack direction="column" spacing={1} p={2} pt={5} position="relative">
            <Button onClick={handleClose} sx={{ position: 'absolute', top: 4, right: 3 }}>
              <KeyboardArrowLeft />
            </Button>
            <Button component={Link} href="/">
              Home
            </Button>
            <Button component={Link} href="/about">
              About
            </Button>
            <Button component={Link} href="/projects">
              Projects
            </Button>
            <Button component={Link} href="/contact">
              Contact
            </Button>
          </Stack>
        </NavigationTabContainer>
      </Box>
      <Box
        display={{
          xs: 'none',
          md: 'block',
        }}
      >
        {/* Add content of header */}
        <Typography variant="h6">My Portfolio</Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} href="/">
            Home
          </Button>
          <Button component={Link} href="/about">
            About
          </Button>
          <Button component={Link} href="/projects">
            Projects
          </Button>
          <Button component={Link} href="/contact">
            Contact
          </Button>
        </Stack>
      </Box>
      <Stack direction="row" spacing={2} px={3}>
        {' '}
        <Stack direction="row" spacing={1} alignItems="center">
          <Button component={Link} href="/auth/sign-in">
            Sign In
          </Button>
          <Button component={Link} href="/auth/sign-up">
            Sign Up
          </Button>
        </Stack>
        <DefaultThemeSelect />
      </Stack>
    </Box>
  );
}
