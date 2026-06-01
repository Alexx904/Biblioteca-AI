import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Grid, Paper, Tooltip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { io } from "socket.io-client"; // npm install socket.io-client --legacy-peer-deps

function MappaPostazioni({ aulaSelezionata, onPostazioneSelezionata, dataFiltro, oraFiltro }) {
  const [postazioni, setPostazioni] = useState([]);
  const [selezionata, setSelezionata] = useState(null);

  const [openPopup, setOpenPopup] = useState(false);
  const [postoDaPrenotare, setPostoDaPrenotare] = useState(null);

  const [dataPrenotazione, setDataPrenotazione] = useState('');
  const [oraPrenotazione, setOraPrenotazione] = useState('');
  const [durata, setDurata] = useState(1);

  const socketRef = useRef(null);

  const isTokenValido = () => {
    const token = localStorage.getItem("token");
    if (!token || token === "null") return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };
  const fetchPostazione = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (dataFiltro) params.append('data', dataFiltro);
      if (oraFiltro) params.append('ora', oraFiltro);

      const res = await fetch(`http://localhost:3000/api/postazioni/${aulaSelezionata}?${params}`);
      if (res.ok) {
        const data = await res.json();
        setPostazioni(data);
      }
    } catch (errore) {
      console.error("Errore", errore);
    }
  }, [aulaSelezionata, dataFiltro, oraFiltro]);

  useEffect(() => {
    // Crea connessione socket una sola volta
    socketRef.current = io("http://localhost:3000");

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    // Entra nella stanza dell'aula selezionata
    socketRef.current.emit("joinAula", aulaSelezionata);

    // Ascolta aggiornamenti realtime: aggiorna solo il posto interessato
    const handleAggiornamento = ({ id_posto, stato }) => {
      setPostazioni(prev =>
        prev.map(p => p.id_posto === id_posto ? { ...p, stato } : p)
      );
    };

    socketRef.current.on("postazioneAggiornata", handleAggiornamento);

    return () => {
      socketRef.current.off("postazioneAggiornata", handleAggiornamento);
    };
  }, [aulaSelezionata]);

  useEffect(() => {
    fetchPostazione();
    setSelezionata(null);
    if (onPostazioneSelezionata) onPostazioneSelezionata(null);

    window.addEventListener("aggiornaDati", fetchPostazione);
    return () => window.removeEventListener("aggiornaDati", fetchPostazione);
  }, [aulaSelezionata, dataFiltro, oraFiltro]); //ripeti se cambiato aula
  // Aggiorna le postazioni mostrate quando cambia l'aula

  const handleSeleziona = (postazione) => {

    // Blocco login — il click apre il dialog solo se loggati
    if (!isTokenValido()) {
      alert("Devi effettuare il login per prenotare una postazione!");
      return;
    }

    if (postazione.stato === 'occupata') return; // Non puoi selezionare un posto occupato
    // Pre-compila i campi con i filtri già selezionati nella barra sopra
    if (dataFiltro) setDataPrenotazione(dataFiltro);
    if (oraFiltro) setOraPrenotazione(oraFiltro);

    setPostoDaPrenotare(postazione); //salvo il posto che voglio prenotare
    setOpenPopup(true);
  };

  const confermaPrenotazione = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Devi effettuare il login per prenotare!");
    if (!dataPrenotazione || !oraPrenotazione) return alert("Inserisci data e ora!");

    try {
      const res = await fetch(`http://localhost:3000/api/postazioni/${postoDaPrenotare.id_posto}/prenota`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ data: dataPrenotazione, ora: oraPrenotazione, durata })
      });

      if (res.ok) {
        alert("Posto prenotato!");
        setPostazioni(prev => prev.map(p => p.id_posto === postoDaPrenotare.id_posto ? { ...p, stato: "occupata" } : p));
        setOpenPopup(false);
      } else {
        alert((await res.json()).messaggio);
      }
    } catch (er) { console.error(er); }
  };

  const getBgColor = (postazione) => {
    if (postazione.stato === 'occupata') return '#fca5a5'; // Rosso
    if (selezionata === postazione.id_posto) return '#bfdbfe'; // Blu
    return '#bbf7d0'; // Verde
  };


  return (
    <Box sx={{ width: '100%', mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, border: '1px solid #e0e0e0' }}>
      <Typography variant="h6" align="center" gutterBottom color="text.secondary">
        Mappa: {aulaSelezionata === 'aulaA' ? 'Aula A' : 'Aula B'}
        {dataFiltro && oraFiltro && (
          <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            — Disponibilità per {dataFiltro} alle {oraFiltro}
          </Typography>
        )}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 3, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: '#bbf7d0', border: '1px solid #166534', borderRadius: 1 }} />
          <Typography variant="body2">Libero</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: '#fca5a5', border: '1px solid #dc2626', borderRadius: 1 }} />
          <Typography variant="body2">Occupato</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: '#bfdbfe', border: '1px solid #1e3a8a', borderRadius: 1 }} />
          <Typography variant="body2">Selezionato</Typography>
        </Box>
      </Box>

      {/* Lavagna per orientamento */}
      <Box sx={{ width: '60%', height: 10, bgcolor: 'grey.400', margin: '0 auto 20px', borderRadius: 1 }} />
      <Typography variant="caption" display="block" align="center" sx={{ mb: 3 }} color="text.secondary">
        Cattedra / Lavagna
      </Typography>

      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {postazioni.map((postazione) => (
          <Grid item xs={3} sm={2} md={1.5} key={postazione.id_posto}>
            <Tooltip title={`Posto ${postazione.id_posto} - ${postazione.stato.toUpperCase()}`} arrow>
              <Paper
                onClick={() => handleSeleziona(postazione)}
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1,
                  cursor: postazione.stato === 'occupata' ? 'not-allowed' : 'pointer',
                  bgcolor: getBgColor(postazione), // <--- COLORE DI SFONDO APPLICATO QUI
                  borderRadius: 2, transition: '0.2s',
                  '&:hover': { opacity: 0.8 }
                }}
              >
                <EventSeatIcon sx={{ color: postazione.stato === 'occupata' ? '#dc2626' : '#166534', fontSize: 28 }} />
                <Typography variant="caption" fontWeight="bold">{postazione.id_posto}</Typography>
              </Paper>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
      {/* --- COMPONENTE POPUP (DIALOG) --- */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>Prenota il posto {postoDaPrenotare?.id_posto}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField type="date" label="Data" focused value={dataPrenotazione} onChange={e => setDataPrenotazione(e.target.value)} fullWidth />
          <TextField type="time" label="Ora di arrivo" focused value={oraPrenotazione} onChange={e => setOraPrenotazione(e.target.value)} fullWidth />
          <TextField type="number" label="Durata (Ore)" value={durata} onChange={e => setDurata(e.target.value)} slotProps={{ htmlInput: { min: 1, max: 12 } }} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Annulla</Button>
          <Button onClick={confermaPrenotazione} variant="contained">Conferma</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MappaPostazioni;