import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function Profilo({ open, onClose }) {
    const [profilo, setProfilo] = useState(null);

    // useEffect scatta ogni volta che "open" diventa true (cioè quando apri il popup)
    useEffect(() => {
        if (!open) return;

        const fetchProfilo = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:3000/api/auth/profilo", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfilo(data);
                }
            } catch (err) {
                console.error("Errore recupero profilo:", err);
            }
        };

        fetchProfilo();
    }, [open]);

    // Array sicuri per evitare errori se i dati non sono ancora arrivati
    const postazioni = profilo?.postazioniPrenotate || []; //? solo se non null
    const libri = profilo?.libriPrenotati || [];

    const handleRestituisciLibro = async (idLibro) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:3000/api/libri/${idLibro}/restituisci`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                alert("Libro restituito con successo!");
                // Aggiorna visivamente il profilo togliendo il libro dalla lista
                setProfilo(prev => ({
                    ...prev,
                    libriPrenotati: prev.libriPrenotati.filter(l => l._id !== idLibro)
                }));
                // Diciamo al catalogo di aggiungere +1 alle copie
                window.dispatchEvent(new Event("aggiornaDati"));
            }
        } catch (err) {
            console.error(err);
        }
    };

    //disdire prenotazione
    const handleDisdiciPostazione = async (idPosto) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (!window.confirm(`Vuoi davvero disdire il posto ${idPosto}?`)) return;

        try {
            const res = await fetch(`http://localhost:3000/api/postazioni/${idPosto}/disdici`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                alert("Prenotazione disdetta con successo!");
                // Rimuovi il posto dalla lista visiva
                setProfilo(prev => ({
                    ...prev,
                    postazioniPrenotate: prev.postazioniPrenotate.filter(p => p.id_posto !== idPosto)
                }));
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {/* INTESTAZIONE DEL POPUP */}
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                {profilo ? `Le prenotazioni di ${profilo.nome}` : "Le Mie Prenotazioni"}
            </DialogTitle>

            {/* CORPO DEL POPUP */}
            <DialogContent dividers sx={{ bgcolor: '#f8fafc', p: 3 }}>
                {!profilo ? (
                    <Typography align="center" mt={2} color="error">
                        Devi effettuare il login per vedere le tue prenotazioni.
                    </Typography>
                ) : (
                    <Grid container spacing={4}>

                        {/* COLONNA POSTAZIONI */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, height: '100%', borderTop: '4px solid #0ea5e9' }}>
                                <Typography variant="h6" color="primary" gutterBottom>Posti a sedere</Typography>
                                {postazioni.map(posto => {
                                    // Cerchiamo la prenotazione specifica di questo utente per estrarre data e ora
                                    const miaPrenotazione = posto.prenotazioni?.find(p => p.utenteId === profilo._id);

                                    return (
                                        <Card key={posto._id} sx={{ mb: 2, bgcolor: '#f0f9ff' }} elevation={0}>
                                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="h6" fontWeight="bold">Posto: {posto.id_posto}</Typography>
                                                    <Typography color="text.secondary" variant="body2">Aula: {posto.aula}</Typography>

                                                    {/* Mostriamo data e ora */}
                                                    {miaPrenotazione && (
                                                        <Typography variant="caption" display="block" sx={{ mt: 1, color: '#0284c7', fontWeight: 'bold' }}>
                                                            📅 {miaPrenotazione.data} | 🕒 {miaPrenotazione.ora} ({miaPrenotazione.durata}h)
                                                        </Typography>
                                                    )}
                                                </Box>

                                                {/* BOTTONE DISDICI */}
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDisdiciPostazione(posto.id_posto)}
                                                >
                                                    Disdici
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </Paper>
                        </Grid>

                        {/* COLONNA LIBRI */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, height: '100%', borderTop: '4px solid #d946ef' }}>
                                <Typography variant="h6" color="secondary" gutterBottom>Libri</Typography>
                                {libri.length === 0 ? <Typography color="text.secondary">Nessun libro prenotato.</Typography> : null}

                                {libri.map(libro => (
                                    <Card key={libro._id} sx={{ mb: 2, bgcolor: '#fdf4ff' }} elevation={0}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">{libro.titolo}</Typography>
                                                <Typography color="text.secondary" variant="body2">{libro.autore}</Typography>
                                                <Typography variant="caption" display="block" mt={1}>Scaffale: {libro.scaffale}</Typography>
                                            </Box>

                                            {/* TASTO RESTITUISCI */}
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                size="small"
                                                onClick={() => handleRestituisciLibro(libro._id)}
                                            >
                                                Restituisci
                                            </Button>

                                        </CardContent>
                                    </Card>
                                ))}
                            </Paper>
                        </Grid>

                    </Grid>
                )}
            </DialogContent>

            {/* PIÈ DI PAGINA CON BOTTONE CHIUDI */}
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} variant="contained" color="inherit" sx={{ color: 'black' }}>
                    Chiudi
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Profilo;