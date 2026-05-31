import { useState } from "react"; //strumeto per far ricordare react
import Hamburger from "./Hamburger";
import NavLink from "./NavLink"
import { Dialog, Stack, Box, Typography, Avatar , Menu, MenuItem} from "@mui/material";
import {Button} from "@mui/material";
import SignupForm from "./SignupForm";
import * as React from "react";
import { MenuBook } from "@mui/icons-material";

function NavBar(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const clickHamburger = () =>{
        setIsMenuOpen(!isMenuOpen);
    }

    const [open, setOpen] = React.useState(false);

    const [utenteLoggato, setUtenteLoggato] = useState(null);

    const handleClickOpen = ()=>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    // Funzione che scatta quando il login va a buon fine
    const handleLoginSuccess = (datiUtente) => {
        setUtenteLoggato(datiUtente); // Salva l'utente
        setOpen(false); // Chiude il popup
    };

    const[elenco, setElenco]= useState(null);

    const menuAperto = Boolean(elenco);

    const handleApriMenu = (e)=>{
        setElenco(e.currentTarget);
    };

    const handleChiudiMenu = ()=>{
        setElenco(null);
    };

    
    // Funzione per uscire
    const handleLogout = () => {
        setUtenteLoggato(null);
        handleChiudiMenu();
    };

    return(
        <>
        <Stack direction="row" alignItems="center" spacing={2} sx={{display: { xs: 'none', md: 'flex' }}}> {/*Stack che contiene i NavLink. display none su schermi piccoli, flex su schermi più grandi*/}
            <NavLink name="Catalogo" link="#catalogo"/>
            <NavLink name="Postazioni" link="#postazioni"/>
            <NavLink name="Chat" link="#chat"/>
        </Stack>

        {/* se utente è loggato mostra Nome e Logout */}
            {utenteLoggato ? (
                <>
                <Box 
                    onClick={handleApriMenu}
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5, 
                        backgroundColor: '#f0f0f0', 
                        padding: '5px 15px', 
                        borderRadius: 5, 
                        cursor: 'pointer',
                        transition: '0.3s', 
                        '&:hover': { backgroundColor: '#e0e0e0' }
                    }}
                >
                    <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main' }}>
                        {utenteLoggato.nome.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1f375e' }}>
                        {utenteLoggato.nome}
                    </Typography>
                </Box>

                <Menu   
                    anchorEl={elenco}
                    open={menuAperto}
                    onClose={handleChiudiMenu}
                    anchorOrigin={{vertical: "bottom", horizontal:"right"}}
                    transformOrigin={{vertical: "top", horizontal:"right"}}
                    >
                        <MenuItem onClick={handleChiudiMenu}>Le mie Prenotazioni</MenuItem>
                        <MenuItem onClick={handleChiudiMenu}>Impostazioni</MenuItem>
                        <MenuItem onClick={handleLogout} sx={{color: "grammar-error.main", fontWeight:"bold"}}>Logout</MenuItem>
                    </Menu>
                    </>
                
            ) : (
                /* altrimenti mostra il bottone SignUp/Login */
                <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                    SignUp/Login
                </Button>
            )}

        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            >
                <SignupForm onLoginSuccess ={handleLoginSuccess}/>
            </Dialog>
        </>
    );

/*    return(
        <>
            <nav className={`header__nav ${isMenuOpen ? "open" : ""}`} id="headerNav">
                <ul className="header__nav-list">
                    <NavLink name="Catalogo" link="#catalogo"/>
                    <NavLink name="Postazioni" link="#postazioni"/>
                    <NavLink name="Chat" link="#chat"/>
                    <li><button className="buttonNav" id="openPopup">Login / Signup</button></li>
                </ul>
            </nav>

            <Hamburger gestioneClick={clickHamburger}/>
        </>
    );
}
*/
}
export default NavBar;