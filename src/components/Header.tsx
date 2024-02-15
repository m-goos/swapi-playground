import { Box } from '@mui/material';

export function Header() {
  return (
    <Box
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        background: '#212121',
        width: '100%',
        fontFamily: 'Bungee Outline',
        fontSize: '80px',
        color: '#ffeb3b',
      }}
    >
      STAR WARS
    </Box>
  );
}

export default Header;
