import { Link as RouterLink } from 'react-router-dom';
import { Link, Button, Box } from '@mui/material';

export function Navbar() {
  return (
    <Box
      maxWidth="md"
      sx={{
        background: '#212121',
        width: '100%',
      }}
    >
      <Link component={RouterLink} to="/">
        <Button
          sx={{
            color: '#ffeb3b',
          }}
        >
          Home
        </Button>
      </Link>{' '}
      <Link component={RouterLink} to="/films">
        <Button
          sx={{
            color: '#ffeb3b',
          }}
        >
          Films
        </Button>
      </Link>
    </Box>
  );
}

export default Navbar;
