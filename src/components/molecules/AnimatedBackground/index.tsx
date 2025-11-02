import { Box } from '@mui/material';

interface AnimatedBackgroundProps {
  variant?: 'gradient' | 'particles' | 'waves';
}

export const AnimatedBackground = ({ variant = 'gradient' }: AnimatedBackgroundProps) => {
  return (
    <>
      {/* Gradient Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: theme =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #0a0e27 0%, #1a1f3a 50%, #2a3f5f 100%)'
              : 'linear-gradient(45deg, #f0f4f8 0%, #d9e2ec 50%, #bcccdc 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      />

      {/* Floating Particles */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {[...Array(300)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              borderRadius: '50%',
              background: theme =>
                theme.palette.mode === 'dark'
                  ? `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
                  : `rgba(0, 0, 0, ${Math.random() * 0.15 + 0.05})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-${i} ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              [`@keyframes float-${i}`]: {
                '0%, 100%': { transform: 'translate(0, 0)' },
                '33%': {
                  transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`,
                },
                '66%': {
                  transform: `translate(${Math.random() * -100 + 50}px, ${Math.random() * 100 - 50}px)`,
                },
              },
            }}
          />
        ))}
      </Box>
    </>
  );
};
