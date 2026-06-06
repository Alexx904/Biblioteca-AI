import NavBar from "./NavBar";
//import Auth from "./Auth";
import { Stack,AppBar,Toolbar,Typography, Button, Box, Avatar } from "@mui/material";

function Header(){
    return(
        <>
        {/* AppBar con colori personalizzati che gestisce il posizionamento, l'ombra e i colori della Navbar. */}
        <AppBar position="sticky" sx={{backgroundColor:'navbar.main'}}>
            {/* Toolbar con justifyContent: 'space-between' per distribuire gli elementi (logo a sinistra, NavLinks al centro, Login a destra). */}
            <Toolbar  sx={{justifyContent: 'space-between', m: 0.5}}>   
                <Box component="a" href="index.html">
                    {/* Primo Stack per il logo e il titolo. */}
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <Avatar src="img/logo.png" alt="logo" sx={{height:50, width:50}}  />
                        <Typography variant="h5" sx={{color:'navbar.contrastText',fontFamily: 'serif', fontWeight: 'bold', display: { xs:'none', md: 'block' } }}>
                            Biblioteca
                        </Typography>
                    </Stack>
                </Box>
                {/* Secondo elemento della NavBar: i NavLinks. */}
                
                <NavBar/>                              
                

            </Toolbar>
        </AppBar>
        
        </>
    )
}

/*function Header(){
    return(
        <header className="header">
            <div className="header__container">
                <a className="header__logo" href="index.html">
                <img className="logo" src="img/logo.png" alt="logo" width="100px" height="70px"/>
                <span>Biblioteca</span>
                </a>
                <NavBar/>
                <Auth/>
            </div>
        </header>
    );
}
*/

export default Header;