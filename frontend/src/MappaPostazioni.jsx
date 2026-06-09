import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Grid, Paper, Tooltip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { io } from "socket.io-client"; // npm install socket.io-client --legacy-peer-deps
import apiFetch from './api';


function MappaPostazioni({ aulaSelezionata, onPostazioneSelezionata, dataFiltro, oraFiltro }) {
  const [postazioni, setPostazioni] = useState([]);
  const [selezionata, setSelezionata] = useState(null);

  const [openPopup, setOpenPopup] = useState(false);
  const [postoDaPrenotare, setPostoDaPrenotare] = useState(null);

  const [dataPrenotazione, setDataPrenotazione] = useState('');
  const [oraPrenotazione, setOraPrenotazione] = useState('');
  const [durata, setDurata] = useState(1);

  const [notifica, setNotifica] = useState({ open: false, messaggio: '', tipo: 'info' });

  // Funzione per chiudere la notifica
  const handleCloseNotifica = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotifica({ ...notifica, open: false });
  };

  // Traccia stato login tramite eventi 
  const [isLoggato, setIsLoggato] = useState(false);

  const socketRef = useRef(null);

  const chiudiPopup = () => {
    setOpenPopup(false);
    setPostoDaPrenotare(null);
  };

  //controllo login
  useEffect(() => {
    const verificaLogin = async () => {
      try {
        const res = await apiFetch("/api/auth/profilo");
        setIsLoggato(res.ok);
      } catch {
        setIsLoggato(false);
      }
    };

    verificaLogin();

    const onLogin = () => setIsLoggato(true);
    const onScaduta = () => setIsLoggato(false);

    window.addEventListener("loginEffettuato", onLogin);
    window.addEventListener("sessioneScaduta", onScaduta);

    return () => {
      window.removeEventListener("loginEffettuato", onLogin);
      window.removeEventListener("sessioneScaduta", onScaduta);
    };
  }, []);


  const fetchPostazione = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (dataFiltro) params.append('data', dataFiltro);
      if (oraFiltro) params.append('ora', oraFiltro);

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/postazioni/${aulaSelezionata}?${params}`, {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setPostazioni(data);
      }
    } catch (errore) {
      console.error("Errore", errore);
    }
  }, [aulaSelezionata, dataFiltro, oraFiltro]);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    socketRef.current = io(baseUrl, { withCredentials: true });
    return () => { socketRef.current.disconnect(); };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.emit("joinAula", aulaSelezionata);

    const handleAggiornamento = ({ id_posto, stato }) => {
      setPostazioni(prev =>
        prev.map(p => String(p.id_posto) === String(id_posto) ? { ...p, stato } : p)
      );
    };

    socketRef.current.on("postazioneAggiornata", handleAggiornamento);
    return () => { socketRef.current.off("postazioneAggiornata", handleAggiornamento); };
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
    if (!isLoggato) {
      setNotifica({ open: true, messaggio: "Devi effettuare il login per prenotare!", tipo: "error" });
      return;
    }
    if (postazione.stato === "occupata") return;

    if (dataFiltro) setDataPrenotazione(dataFiltro);
    if (oraFiltro) setOraPrenotazione(oraFiltro);

    setPostoDaPrenotare(postazione);
    setOpenPopup(true);
  };

  const confermaPrenotazione = async () => {
    if (!dataPrenotazione || !oraPrenotazione) return setNotifica({ open: true, messaggio: "Inserisci data e ora!", tipo: "warning" });

    try {
      const res = await apiFetch(`/api/postazioni/${postoDaPrenotare.id_posto}/prenota`, {
        method: "POST",
        body: JSON.stringify({ data: dataPrenotazione, ora: oraPrenotazione, durata })
      });

      if (res.ok) {
        setNotifica({ open: true, messaggio: "Posto prenotato con successo!", tipo: "success" });
        setPostazioni(prev =>
          prev.map(p => p.id_posto === postoDaPrenotare.id_posto ? { ...p, stato: "occupata" } : p)
        );
        chiudiPopup();
      } else {
        const data = await res.json();
        setNotifica({ open: true, messaggio: data.messaggio, tipo: "error" });
      }
    } catch (err) { console.error(err); }
  };

  const getBgColor = (postazione) => {
    if (postazione.stato === 'occupata') return '#fca5a5';
    if (postoDaPrenotare?.id_posto === postazione.id_posto) return '#bfdbfe';
    return '#bbf7d0';
  };

  // Funzione che divide l'array di postazioni in "blocchi" da 4
  const raggruppaPerTavoli = (postazioni, postiPerTavolo = 4) => {
    const tavoli = [];
    for (let i = 0; i < postazioni.length; i += postiPerTavolo) {
      tavoli.push(postazioni.slice(i, i + postiPerTavolo));
    }
    return tavoli;
  };

  const tavoli = raggruppaPerTavoli(postazioni, 4);

  const renderSedia = (postazione, isTopRow) => (
    <Tooltip key={postazione.id_posto} title={`Posto ${postazione.id_posto} - ${postazione.stato.toUpperCase()}`} arrow>
      <Paper
        onClick={() => handleSeleziona(postazione)}
        elevation={postoDaPrenotare?.id_posto === postazione.id_posto ? 6 : 2}
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          cursor: postazione.stato === 'occupata' ? 'not-allowed' : 'pointer',
          bgcolor: getBgColor(postazione),
          // Forma della sedia: arrotondata fuori, piatta contro il tavolo!
          borderRadius: isTopRow ? '50% 50% 15% 15%' : '15% 15% 50% 50%',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          width: 48, height: 48, // Un po' più proporzionate
          border: '2px solid',
          borderColor: postazione.stato === 'occupata' ? '#ef4444' : (postoDaPrenotare?.id_posto === postazione.id_posto ? '#3b82f6' : '#22c55e'),
          zIndex: 1, // Le sedie stanno "sotto" al livello del tavolo
          '&:hover': {
            transform: 'scale(1.1)',
            filter: 'brightness(0.95)',
            zIndex: 10
          }
        }}
      >
        <EventSeatIcon sx={{
          color: postazione.stato === 'occupata' ? '#991b1b' : '#166534',
          fontSize: 20,
          transform: isTopRow ? 'none' : 'rotate(180deg)',
          mb: 0.5
        }} />
        {/* Il testo ora è sempre dritto senza bisogno di calcoli extra */}
        <Typography variant="caption" fontWeight="bold" sx={{ fontSize: '0.7rem', lineHeight: 1 }}>
          {postazione.id_posto}
        </Typography>
      </Paper>
    </Tooltip>
  );


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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mb: 5 }}>
        <Box sx={{ width: '50%', maxWidth: 400, height: 12, bgcolor: '#cbd5e1', borderRadius: 2, mb: 1, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }} />
        <Typography variant="caption" color="text.secondary" fontWeight="bold" letterSpacing={2}>
          CATTEDRA / LAVAGNA
        </Typography>
      </Box>

      {/* MAPPA FISICA DEI TAVOLI */}
      <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 6, // Spazio tra un gruppo-tavolo e l'altro
          justifyContent: 'center', 
          p: 2 
      }}>
        {tavoli.map((tavolo, indexTavolo) => (
          <Box key={`tavolo-${indexTavolo}`} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Fila di sedie Superiori */}
            <Box sx={{ display: 'flex', gap: 3, mb: -1.5, zIndex: 1 }}>
              {tavolo.slice(0, 2).map(postazione => renderSedia(postazione, true))}
            </Box>

            {/* Grafica del Tavolo Centrale */}
            <Paper elevation={3} sx={{ 
                width: 140, 
                height: 70, 
                bgcolor: '#f8fafc', // Colore chiaro scrivania
                backgroundImage: 'linear-gradient(to bottom right, #ffffff, #e2e8f0)', // Leggero effetto 3D
                borderRadius: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                border: '1px solid #cbd5e1',
                zIndex: 0.75// Il tavolo copre leggermente i bordi delle sedie (effetto realistico)
            }}>
              <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ letterSpacing: 1, opacity: 0.6 }}>
                TAVOLO {indexTavolo + 1}
              </Typography>
            </Paper>

            {/* Fila di sedie Inferiori */}
            <Box sx={{ display: 'flex', gap: 3, mt: -1.5, zIndex: 1 }}>
              {tavolo.slice(2, 4).map(postazione => renderSedia(postazione, false))}
            </Box>

          </Box>
        ))}
      </Box>
      {/* --- COMPONENTE POPUP (DIALOG) --- */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>Prenota il posto {postoDaPrenotare?.id_posto}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField type="date" label="Data" focused value={dataPrenotazione} onChange={e => setDataPrenotazione(e.target.value)} fullWidth />
          <TextField type="time" label="Ora di arrivo" focused value={oraPrenotazione} onChange={e => setOraPrenotazione(e.target.value)} fullWidth />
          <TextField type="number" label="Durata (Ore)" value={durata} onChange={e => setDurata(e.target.value)} slotProps={{ htmlInput: { min: 1, max: 12 } }} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={chiudiPopup}>Annulla</Button>
          <Button onClick={confermaPrenotazione} variant="contained">Conferma</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={notifica.open}
        autoHideDuration={4000}
        onClose={handleCloseNotifica}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotifica} severity={notifica.tipo} sx={{ width: '100%' }}>
          {notifica.messaggio}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MappaPostazioni;