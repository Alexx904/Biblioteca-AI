import { useState } from "react"; //strumeto per far ricordare react
import Hamburger from "./Hamburger";
import NavLink from "./NavLink"
import { Dialog, Stack, Box, Typography, Avatar, Menu, MenuItem, Button } from "@mui/material";
import SignupForm from "./SignupForm";
import * as React from "react";
import { MenuBook } from "@mui/icons-material";
import Profilo from "./Profilo";
import AdminDashboard from "./AdminDashboard";
import { useEffect } from "react";
import Impostazioni from "./Impostazioni";
import apiFetch from "./api";

function NavBar() {

    const [open, setOpen] = React.useState(false); //Dialog SignupForm
    const [utenteLoggato, setUtenteLoggato] = useState(null);

    const [elenco, setElenco] = useState(null); //ancora il menu a tendina
    const menuAperto = Boolean(elenco);

    const [popupProfiloAperto, setPopupProfiloAperto] = useState(false);
    const [popupAdminAperto, setPopupAdminAperto] = useState(false);
    const [popupImpostazioniAperto, setPopupImpostazioniAperto] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleApriMenu = (e) => {
        setElenco(e.currentTarget);
    };

    const handleChiudiMenu = () => {
        setElenco(null);
    };

    // Funzione che scatta quando il login va a buon fine
    const handleLoginSuccess = (datiUtente) => {
        setUtenteLoggato(datiUtente); // Salva l'utente
        setOpen(false); // Chiude il popup
    };

    //Logout: chiama il backend per revocare il refresh token
    const handleLogout = async () => {
        try {
            await apiFetch("/api/auth/logout", { method: "POST" });
        } catch (err) {
            console.error("Errore durante il logout:", err);
        }
        setUtenteLoggato(null);
        handleChiudiMenu();
    };

    //hamburger
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    
    const clickHamburger = () => {
        setIsMenuOpen(!isMenuOpen);
    }    

    // ── Controlla se c'è una sessione attiva (cookie) ────────────────────────
    const controllaLogin = async () => {
        try {
            const res = await apiFetch("/api/auth/profilo");
            if (res.ok) {
                const datiUtente = await res.json();
                setUtenteLoggato(datiUtente);
            } else {
                setUtenteLoggato(null);
            }
        } catch (err) {
            console.error("Errore recupero utente NavBar:", err);
            setUtenteLoggato(null);
        }
    };
 
    useEffect(() => {
        controllaLogin(); // Controlla sessione all'avvio

        // Ricarica i dati dopo login, aggiornamento dati, o sessione scaduta
        const handleSessioneScaduta = () => setUtenteLoggato(null);
 
        window.addEventListener("aggiornaDati",    controllaLogin);
        window.addEventListener("loginEffettuato", controllaLogin);
        window.addEventListener("sessioneScaduta", handleSessioneScaduta);
 
        return () => {
            window.removeEventListener("aggiornaDati",    controllaLogin);
            window.removeEventListener("loginEffettuato", controllaLogin);
            window.removeEventListener("sessioneScaduta", handleSessioneScaduta);
        };
    }, []);

    return (
        <>
            {/* NavLink desktop */}
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", display: { xs: "none", md: "flex" } }}>
                <NavLink name="Catalogo"   link="#catalogo" />
                <NavLink name="Postazioni" link="#postazioni" />
                <NavLink name="Chat"       link="#chat" />
            </Stack>
 
            {/* Area utente: loggato → menu tendina, non loggato → bottone SignUp/Login */}
            {utenteLoggato ? (
                <>
                    {/* Box cliccabile con avatar e nome */}
                    <Box
                        onClick={handleApriMenu}
                        sx={{
                            display: "flex", alignItems: "center", gap: 1.5,
                            padding: "5px 15px", borderRadius: 5,
                            cursor: "pointer", transition: "0.3s"
                        }}
                    >
                        <Avatar sx={{ width: 30, height: 30, bgcolor: "primary.main" }}>
                            {utenteLoggato.nome.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {utenteLoggato.nome}
                        </Typography>
                    </Box>
 
                    {/* Menu a tendina */}
                    <Menu
                        anchorEl={elenco}
                        open={menuAperto}
                        onClose={handleChiudiMenu}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem onClick={() => { handleChiudiMenu(); setPopupProfiloAperto(true); }}>
                            Le mie Prenotazioni
                        </MenuItem>
 
                        <MenuItem onClick={() => { handleChiudiMenu(); setPopupImpostazioniAperto(true); }}>
                            Impostazioni
                        </MenuItem>
 
                        <MenuItem onClick={handleLogout} sx={{ color: "error.main", fontWeight: "bold" }}>
                            Logout
                        </MenuItem>
 
                        {utenteLoggato?.ruolo === "admin" && (
                            <MenuItem
                                onClick={() => { handleChiudiMenu(); setPopupAdminAperto(true); }}
                                sx={{ color: "error.main", fontWeight: "bold" }}
                            >
                                Pannello Admin
                            </MenuItem>
                        )}
                    </Menu>
                </>
            ) : (
                <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                    SignUp / Login
                </Button>
            )}
 
            {/* Dialog login/registrazione */}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <SignupForm onLoginSuccess={handleLoginSuccess} />
            </Dialog>
 
            {/* Dialog prenotazioni */}
            <Profilo
                open={popupProfiloAperto}
                onClose={() => setPopupProfiloAperto(false)}
            />
 
            {/* Dialog impostazioni */}
            <Impostazioni
                open={popupImpostazioniAperto}
                onClose={() => setPopupImpostazioniAperto(false)}
            />
 
            {/* Dialog admin */}
            <AdminDashboard
                open={popupAdminAperto}
                onClose={() => setPopupAdminAperto(false)}
            />
        </>
    );
}
export default NavBar;