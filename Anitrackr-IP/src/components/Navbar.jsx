import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';  
import { Link, useNavigate } from 'react-router-dom'; 
// import { jwtDecode } from "jwt-decode"; 

const Navbar = () => {  

  const token = localStorage.getItem("access_token")
  const userId = localStorage.getItem("id")

  const navigate = useNavigate();  
 
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Anime List', path: `/user/${userId}/anime-list` },
    { name: 'Search', path: '/anime/search' },
  ];  

  const handleLogout = () => {  
    localStorage.clear()  
    navigate('/'); 
  };  

  const isLoggedIn = !!token; 


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

          {/* LOGIN AND REGISTER LINKS OR PROFILE AND LOGOUT LINKS */}  
          <Box sx={{ display: 'flex', alignItems: 'center' }}>  
            {isLoggedIn ? (  
              <>  
                <Button  
                  component={Link}  
                  to={`/user/${userId}/profile`} // assuming a profile path exists  
                  sx={{ color: 'black', mx: 1 }}  
                >  
                  Profile  
                </Button>  
                <Button  
                  onClick={handleLogout} // Handle logout on click  
                  sx={{ color: 'black', mx: 1 }}  
                >  
                  Logout  
                </Button>  
              </>  
            ) : (  
              <>  
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
              </>  
            )}  
          </Box>  

        </Toolbar>  
      </Container>  
    </AppBar>  
  );  
};  

export default Navbar;
