import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';  
import { Link } from 'react-router-dom';  

const Navbar = () => {  
  // Define your pages here with the correct paths  
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Anime List', path: '/user/:id/anime-list' },
    { name: 'Search', path: '/anime/search' },
  ];  

  return (  
    <AppBar position="fixed" sx={{ backgroundColor: '#fcfcfc' }}>  
      <Container maxWidth="xl" disableGutters>  
        <Toolbar disableGutters>  

          {/* LOGO */}  
          <Typography  
            variant="h6"  
            noWrap  
            component="a"  
            href="/"  
            sx={{  
              display: 'flex',  
              mr: 2,  
              fontWeight: 700,  
              color: 'inherit',  
              textDecoration: 'none',  
              letterSpacing: '.3rem',  
            }}  
          >  
            <img src="https://i.imgur.com/JwPlNZo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />  
          </Typography>  

          {/* NAVIGATION LINKS */}  
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>  
            {pages.map((page) => (  
              <Button  
                key={page.name} // Use page name as key since it's unique  
                component={Link}  
                to={page.path} // Use the defined path for each page  
                sx={{ color: 'black', mx: 1 }}  
              >  
                {page.name}  
              </Button>  
            ))}  
          </Box>  

          {/* LOGIN AND REGISTER LINKS */}  
          <Box sx={{ display: 'flex', alignItems: 'center' }}>  
            <Button  
              component={Link}  
              to="/login"   
              sx={{ color: 'black', mx: 1 }}  
            >  
              Login  
            </Button>  
            <Button  
              component={Link}  
              to="/register"   
              sx={{ color: 'black', mx: 1 }}  
            >  
              Register  
            </Button>  
          </Box>  

        </Toolbar>  
      </Container>  
    </AppBar>  
  );  
};  

export default Navbar;
