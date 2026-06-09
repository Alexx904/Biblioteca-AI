import React, { useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Switch, Tabs, Tab,
    Box, Typography, Alert, Divider, Avatar, CircularProgress
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "./ThemeContext";
import apiFetch from "./api";

function Impostazioni({ open, onClose }) {
    const { isDark, toggleTheme } = useThemeContext();
    const [tab, setTab] = useState(0);
    const [caricamento, setCaricamento] = useState(false);

    // ── Dati account ─────────────────────────────────────────────────────────
    const [profilo, setProfilo] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [matricola, setMatricola] = useState("");
    const [facolta, setFacolta] = useState("");
    const [msgAccount, setMsgAccount] = useState({ testo: "", tipo: "" });

    // ── Password ─────────────────────────────────────────────────────────────
    const [passwordAttuale, setPasswordAttuale] = useState("");
    const [nuovaPassword, setNuovaPassword] = useState("");
    const [confermaPassword, setConfermaPassword] = useState("");
    const [msgPassword, setMsgPassword] = useState({ testo: "", tipo: "" });

    // ── Carica profilo quando il dialog si apre ───────────────────────────────
    useEffect(() => {
        if (!open) return;
        const carica = async () => {
            setCaricamento(true);
            try {
                const res = await apiFetch("/api/auth/profilo");
                if (res.ok) {
                    const data = await res.json();
                    setProfilo(data);
                    setNome(data.nome       || "");
                    setEmail(data.email     || "");
                    setMatricola(data.matricola || "");
                    setFacolta(data.facolta  || "");
                }
            } catch (err) {
                console.error("Errore caricamento profilo Impostazioni:", err);
            } finally {
                setCaricamento(false);
            }
        };
        carica();
    }, [open]);

    // ── Salva dati account ────────────────────────────────────────────────────
    const handleSalvaAccount = async () => {
        setMsgAccount({ testo: "", tipo: "" });
        try {
            const res = await apiFetch("/api/auth/me/aggiorna", {
                method: "PUT",
                body: JSON.stringify({ nome, email, matricola, facolta })
            });
            const data = await res.json();
            if (res.ok) {
                setMsgAccount({ testo: "Profilo aggiornato con successo!", tipo: "success" });
                window.dispatchEvent(new Event("aggiornaDati")); // aggiorna NavBar
            } else {
                setMsgAccount({ testo: data.messaggio, tipo: "error" });
            }
        } catch {
            setMsgAccount({ testo: "Errore di connessione al server", tipo: "error" });
        }
    };

    // ── Cambia password ───────────────────────────────────────────────────────
    const handleCambiaPassword = async () => {
        setMsgPassword({ testo: "", tipo: "" });
        if (nuovaPassword !== confermaPassword) {
            setMsgPassword({ testo: "Le nuove password non coincidono", tipo: "error" });
            return;
        }
        if (nuovaPassword.length < 6) {
            setMsgPassword({ testo: "La nuova password deve avere almeno 6 caratteri", tipo: "error" });
            return;
        }
        try {
            const res = await apiFetch("/api/auth/me/password", {
                method: "PUT",
                body: JSON.stringify({ passwordAttuale, nuovaPassword })
            });
            const data = await res.json();
            if (res.ok) {
                setMsgPassword({ testo: "Password aggiornata con successo!", tipo: "success" });
                setPasswordAttuale("");
                setNuovaPassword("");
                setConfermaPassword("");
            } else {
                setMsgPassword({ testo: data.messaggio, tipo: "error" });
            }
        } catch {
            setMsgPassword({ testo: "Errore di connessione al server", tipo: "error" });
        }
    };

    // ── Chiusura dialog ───────────────────────────────────────────────────────
    const handleChiudi = () => {
        setMsgAccount({ testo: "", tipo: "" });
        setMsgPassword({ testo: "", tipo: "" });
        setPasswordAttuale("");
        setNuovaPassword("");
        setConfermaPassword("");
        setTab(0);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleChiudi} maxWidth="sm" fullWidth>
            {/* Intestazione */}
            <DialogTitle sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold", pb: 1 }}>
                Impostazioni
            </DialogTitle>

            {/* Tabs */}
            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: "divider" }}
            >
                <Tab icon={<AccountCircleIcon fontSize="small" />} iconPosition="start" label="Account" />
                <Tab icon={<LockIcon fontSize="small" />} iconPosition="start" label="Sicurezza" />
            </Tabs>

            <DialogContent sx={{ p: 3 }}>
                {caricamento ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {/* ── TAB ACCOUNT ──────────────────────────────────── */}
                        {tab === 0 && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {/* Avatar + nome + ruolo */}
                                {profilo && (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main", fontSize: 24 }}>
                                            {profilo.nome.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold">{profilo.nome}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                                                {profilo.ruolo}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

                                <Divider />

                                {/* Switch dark / light mode */}
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        {isDark
                                            ? <Brightness7Icon color="primary" />
                                            : <Brightness4Icon color="primary" />
                                        }
                                        <Typography>
                                            Modalità {isDark ? "Scura" : "Chiara"}
                                        </Typography>
                                    </Box>
                                    <Switch
                                        checked={isDark}
                                        onChange={toggleTheme}
                                        color="primary"
                                    />
                                </Box>

                                <Divider />

                                {/* Campi modifica account */}
                                <Typography variant="subtitle2" color="text.secondary">
                                    Modifica i tuoi dati
                                </Typography>

                                <TextField
                                    label="Nome completo" size="small" fullWidth
                                    value={nome} onChange={e => setNome(e.target.value)}
                                />
                                <TextField
                                    label="Email" type="email" size="small" fullWidth
                                    value={email} onChange={e => setEmail(e.target.value)}
                                />
                                <TextField
                                    label="Matricola" size="small" fullWidth
                                    value={matricola} onChange={e => setMatricola(e.target.value)}
                                />
                                <TextField
                                    label="Facoltà" size="small" fullWidth
                                    value={facolta} onChange={e => setFacolta(e.target.value)}
                                />

                                {msgAccount.testo && (
                                    <Alert severity={msgAccount.tipo}>{msgAccount.testo}</Alert>
                                )}

                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="contained" onClick={handleSalvaAccount}>
                                        Salva modifiche
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {/* ── TAB SICUREZZA ─────────────────────────────────── */}
                        {tab === 1 && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Cambia Password
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Scegli una password di almeno 6 caratteri.
                                </Typography>

                                <TextField
                                    label="Password attuale" type="password" size="small" fullWidth
                                    value={passwordAttuale}
                                    onChange={e => setPasswordAttuale(e.target.value)}
                                />
                                <TextField
                                    label="Nuova password" type="password" size="small" fullWidth
                                    value={nuovaPassword}
                                    onChange={e => setNuovaPassword(e.target.value)}
                                />
                                <TextField
                                    label="Conferma nuova password" type="password" size="small" fullWidth
                                    value={confermaPassword}
                                    onChange={e => setConfermaPassword(e.target.value)}
                                />

                                {msgPassword.testo && (
                                    <Alert severity={msgPassword.tipo}>{msgPassword.testo}</Alert>
                                )}

                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="contained" onClick={handleCambiaPassword}>
                                        Aggiorna Password
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleChiudi} variant="outlined" color="inherit">
                    Chiudi
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Impostazioni;