import { Grid, Container } from '@mui/material';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Films from '../pages/Films';
import FilmPage from '../pages/Film';
import NotFound from '../pages/NotFound';
import Header from './Header';
import Character from '../pages/Character';

export function Layout() {
  return (
    <Grid
      container
      display="flex"
      minHeight="100vh"
      width="100%"
      direction="column"
      alignItems="center"
      flexWrap="nowrap"
      id="layout-wrapper"
      bgcolor="#fafafa"
    >
      <Header />
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          minHeight: '100%',
          p: 2,
          bgcolor: '#f5f5f5',
        }}
      >
        <Routes>
          <Route index element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<FilmPage />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Grid>
  );
}

export default Layout;
