import NavBar from "./NavBar";
import Auth from "./Auth";
import { Stack,AppBar,Toolbar,Typography, Button } from "@mui/material";

function Header(){
    return(
        /* AppBar con colori personalizzati che gestisce il posizionamento, l'ombra e i colori della Navbar. */
        <AppBar position="sticky" sx={{ backgroundColor: '#1a2e46', color: '#ffffff' }}>
            {/* Toolbar con justifyContent: 'space-between' per distribuire gli elementi (logo a sinistra, NavLinks al centro, Login a destra). */}
            <Toolbar  sx={{justifyContent: 'space-between', m: 1}}>   
                <a className="header__logo" href="index.html">
                    {/* Primo Stack per il logo e il titolo. */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <img className="logo" src="img/logo.png" alt="logo" width="100px" height="70px"/>
                        <Typography variant="h2" sx={{fontFamily: 'serif', fontWeight: 'bold'}}>
                            Biblioteca
                        </Typography>
                    </Stack>
                </a>
                {/* Secondo elemento della NavBar: i NavLinks. */}
                
                <NavBar/>                    
                
                    {/* Bottone per il pulsante di Login. */}
                <Button variant="contained" color="primary" id="openPopup" sx={{ 
                  backgroundColor: '#d4b86a', 
                  color: '#1a2e46',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#c2a558' }
                }}>
                    Login
                </Button>
                
                

            </Toolbar>
        </AppBar>
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