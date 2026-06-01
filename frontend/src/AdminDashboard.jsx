import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid, MenuItem, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AdminDashboard({ open, onClose }) {
  // Stati per il form dei Libri
  const [libroData, setLibroData] = useState({
    titolo: '', autore: '', descrizione: '', copieTotali: '', scaffale: '', categoria: '', colore: '#7c3aed', emoji: '📚'
  });

  // Stati per il form delle Postazioni
  const [postoData, setPostoData] = useState({ id_posto: '', aula: 'aulaA' });

  // Funzioni gestione form
  const handleLibroChange = (e) => setLibroData({ ...libroData, [e.target.name]: e.target.value });
  const handlePostoChange = (e) => setPostoData({ ...postoData, [e.target.name]: e.target.value });

  // INVIA NUOVO LIBRO
  const handleAggiungiLibro = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/libri", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ 
            ...libroData, 
            copieTotali: Number(libroData.copieTotali),
            copieDisponibili: Number(libroData.copieTotali)
        }) 
      });
      if (res.ok) {
        alert("Libro aggiunto!");
        setLibroData({ titolo: '', autore: '', descrizione: '', copieTotali: '', scaffale: '', categoria: '', colore: '#7c3aed'});
        window.dispatchEvent(new Event("aggiornaDati"));
      } else alert((await res.json()).messaggio);
    } catch (err) { console.error(err); }
  };

  // INVIA NUOVA POSTAZIONE
  const handleAggiungiPosto = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/postazioni", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(postoData) 
      });
      if (res.ok) {
        alert("Postazione aggiunta!");
        setPostoData({ id_posto: '', aula: 'aulaA' });
      } else alert((await res.json()).messaggio);
    } catch (err) { console.error(err); }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: 'error.main', color: 'white', fontWeight: 'bold' }}>
        Pannello Amministratore
      </DialogTitle>
      <DialogContent sx={{ p: 4, bgcolor: '#f1f5f9' }}>
        <Grid container spacing={4}>
          
          {/* FORM AGGIUNGI LIBRO */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" color="primary">Aggiungi Libro</Typography>
              <TextField label="Titolo" name="titolo" value={libroData.titolo} onChange={handleLibroChange} size="small" required />
              <TextField label="Autore" name="autore" value={libroData.autore} onChange={handleLibroChange} size="small" required />
              <TextField label="Copie Totali" name="copieTotali" type="number" value={libroData.copieTotali} onChange={handleLibroChange} size="small" required />
              <TextField label="Scaffale (Es. A1)" name="scaffale" value={libroData.scaffale} onChange={handleLibroChange} size="small" />
              <TextField label="Categoria" name="categoria" value={libroData.categoria} onChange={handleLibroChange} size="small" />
              <Button variant="contained" onClick={handleAggiungiLibro}>Salva Libro</Button>
            </Paper>
          </Grid>

          {/* FORM AGGIUNGI POSTAZIONE */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" color="secondary">Aggiungi Postazione</Typography>
              <TextField select label="Aula" name="aula" value={postoData.aula} onChange={handlePostoChange} size="small">
                <MenuItem value="aulaA">Aula A</MenuItem>
                <MenuItem value="aulaB">Aula B</MenuItem>
              </TextField>
              <TextField label="ID Posto (Es. A21, B31)" name="id_posto" value={postoData.id_posto} onChange={handlePostoChange} size="small" required />
              <Button variant="contained" color="secondary" onClick={handleAggiungiPosto}>Salva Posto</Button>
            </Paper>
          </Grid>

        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AdminDashboard;