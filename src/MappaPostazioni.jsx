import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Tooltip, Button } from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat'; 

// Dati fittizi per simulare le postazioni delle due aule
const generaPostazioni = (prefisso, numero, occupatiCasuali) => {
  return Array.from({ length: numero }, (_, index) => ({ //crea un array di lunghezza: numero
    id: `${prefisso}${index + 1}`,
    numero: index + 1,
    stato: occupatiCasuali.includes(index + 1) ? 'occupata' : 'libera',
  }));
};

const auleData = {
  aulaA: generaPostazioni('A', 20, [3, 7, 12, 15, 19]), // 20 posti, alcuni occupati
  aulaB: generaPostazioni('B', 30, [1, 5, 8, 9, 22, 25, 29]), // 30 posti
};

function MappaPostazioni({ aulaSelezionata, onPostazioneSelezionata }) {
  const [postazioni, setPostazioni] = useState([]);
  const [selezionata, setSelezionata] = useState(null);

  // Aggiorna le postazioni mostrate quando cambia l'aula
  useEffect(() => {
    setPostazioni(auleData[aulaSelezionata] || []);
    setSelezionata(null); // Resetta la selezione se cambi aula
    if (onPostazioneSelezionata) onPostazioneSelezionata(null);
  }, [aulaSelezionata, onPostazioneSelezionata]);

  const handleSeleziona = (postazione) => {
    if (postazione.stato === 'occupata') return; // Non puoi selezionare un posto occupato
    
    const nuovaSelezione = selezionata === postazione.id ? null : postazione.id;
    setSelezionata(nuovaSelezione);
    
    if (onPostazioneSelezionata) {
      onPostazioneSelezionata(nuovaSelezione ? postazione : null);
    }
  };

  const getColor = (postazione) => {
    if (postazione.stato === 'occupata') return 'error.main'; // Rosso
    if (selezionata === postazione.id) return 'primary.main'; // Blu (Selezionata)
    return 'success.main'; // Verde (Libera)
  };

  return (
    <Box sx={{ width: '100%', mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, border: '1px solid #e0e0e0' }}>
      <Typography variant="h6" align="center" gutterBottom color="text.secondary">
        Mappa: {aulaSelezionata === 'aulaA' ? 'Aula A' : 'Aula B'}
      </Typography>
      
      {/* Lavagna per orientamento */}
      <Box sx={{ width: '60%', height: 10, bgcolor: 'grey.400', margin: '0 auto 20px', borderRadius: 1 }} />
      <Typography variant="caption" display="block" align="center" sx={{ mb: 3 }} color="text.secondary">
        Cattedra / Lavagna
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {postazioni.map((postazione) => (
          <Grid item xs={3} sm={2} md={1.5} key={postazione.id}>
            <Tooltip 
              title={`Posto ${postazione.id} - ${postazione.stato.toUpperCase()}`} 
              arrow 
              placement="top"
            >
              <Paper
                elevation={selezionata === postazione.id ? 6 : 2}
                onClick={() => handleSeleziona(postazione)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  cursor: postazione.stato === 'occupata' ? 'not-allowed' : 'pointer',
                  bgcolor: postazione.stato === 'occupata' ? 'grey.200' : 'background.paper',
                  border: `2px solid`,
                  borderColor: getColor(postazione),
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: postazione.stato === 'libera' ? 'scale(1.05)' : 'none',
                    borderColor: postazione.stato === 'libera' && selezionata !== postazione.id ? 'primary.light' : getColor(postazione),
                  }
                }}
              >
                <EventSeatIcon sx={{ color: getColor(postazione), fontSize: 28, mb: 0.5 }} />
                <Typography variant="caption" fontWeight="bold" color="text.primary">
                  {postazione.id}
                </Typography>
              </Paper>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MappaPostazioni;