import {
  Box, Container, Typography, Paper, InputBase,
  FormControlLabel, Checkbox, Button, Grid,
  Card, CardContent, Chip, Snackbar, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import SectionTitle from './SectionTitle';
import { useState, useEffect } from 'react';
import apiFetch from './api';

const categorie = [
  { label: 'Tutti' },
  { label: 'Informatica' },
  { label: 'Matematica' },
  { label: 'Fisica' },
  { label: 'Ingegneria' },
  { label: 'Chimica' },
  { label: 'Biologia' },
  { label: 'Lettere' },
  { label: 'Diritto' },
  { label: 'Economia' },
  { label: 'Medicina' },
  { label: 'Filosofia' },
  { label: 'Storia' },
];


function Catalogo() {
  const [cerca, setCerca] = React.useState('');
  const [soloDisponibili, setSoloDisponibili] = React.useState(false);
  const [categoriaAttiva, setCategoriaAttiva] = React.useState('Tutti');

  //stato libri
  const [libri, setLibri] = useState([]);
  const [libriPrenotatiIds, setLibriPrenotatiIds] = useState([]);

  const [notifica, setNotifica] = useState({ open: false, messaggio: '', tipo: 'info' });

  const handleCloseNotifica = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotifica({ ...notifica, open: false });
  };

  // Carica libri dal backend
  const fetchLibri = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/libri`, { credentials: "include" });
      if (res.ok) setLibri(await res.json());
    } catch (err) {
      console.error("Errore caricamento libri:", err);
    }
  };

  //prenotazione libro
  const fetchLibriPrenotati = async () => {
    try {
      const res = await apiFetch("/api/auth/profilo");
      if (res.ok) {
        const data = await res.json();
        const ids = (data.libriPrenotati || []).map(l => (l._id || l).toString());
        setLibriPrenotatiIds(ids);
      } else {
        // Non loggato o sessione scaduta
        setLibriPrenotatiIds([]);
      }
    } catch (err) {
      console.error("Errore caricamento libri prenotati:", err);
      setLibriPrenotatiIds([]);
    }
  };

  useEffect(() => {
    fetchLibri();
    fetchLibriPrenotati();

    const aggiorna = () => { fetchLibri(); fetchLibriPrenotati(); };
    const azzeraPrenotazioni = () => setLibriPrenotatiIds([]); 

    window.addEventListener("aggiornaDati", aggiorna);
    window.addEventListener("loginEffettuato", fetchLibriPrenotati);
    window.addEventListener("sessioneScaduta", azzeraPrenotazioni); 

    return () => {
      window.removeEventListener("aggiornaDati", aggiorna);
      window.removeEventListener("loginEffettuato", fetchLibriPrenotati);
      window.removeEventListener("sessioneScaduta", azzeraPrenotazioni); 
    };
  }, []);


  // Prenotazione libro
  const handlePrenotaLibro = async (idLibro) => {
    try {
      const res = await apiFetch(`/api/libri/${idLibro}/prenota`, { method: "POST" });
      if (res.ok) {
        setNotifica({ open: true, messaggio: "Libro prenotato! Lo troverai in 'Le mie prenotazioni'.", tipo: "success" });
        setLibriPrenotatiIds(prev => [...prev, idLibro]);
        setLibri(prev => prev.map(l =>
          l._id === idLibro ? { ...l, copieDisponibili: l.copieDisponibili - 1 } : l
        ));
        window.dispatchEvent(new Event("aggiornaDati"));
      } else if (res.status === 401) {
        setNotifica({ open: true, messaggio: "Devi effettuare il login per poter prenotare un libro!", tipo: "error" });
      } else {
        const data = await res.json();
        setNotifica({ open: true, messaggio: "Errore: " + data.messaggio, tipo: "error" });
      }
    } catch (err) { console.error(err); }
  };

  // Restituzione libro
  const handleRestituisciLibro = async (idLibro) => {
    try {
      const res = await apiFetch(`/api/libri/${idLibro}/restituisci`, { method: "POST" });
      if (res.ok) {
        setNotifica({ open: true, messaggio: "Libro restituito con successo!", tipo: "success" });
        setLibriPrenotatiIds(prev => prev.filter(id => id !== idLibro));
        setLibri(prev => prev.map(l =>
          l._id === idLibro ? { ...l, copieDisponibili: l.copieDisponibili + 1 } : l
        ));
        window.dispatchEvent(new Event("aggiornaDati"));
      } else {
        const data = await res.json();
        setNotifica({ open: true, messaggio: "Errore: " + data.messaggio, tipo: "error" });
      }
    } catch (err) { console.error(err); }
  };
  
  const libriFiltrati = libri.filter(libro => {
    const matchCerca = libro.titolo.toLowerCase().includes(cerca.toLowerCase()) || libro.autore.toLowerCase().includes(cerca.toLowerCase());
    const matchCategoria = categoriaAttiva === 'Tutti' || libro.categoria === categoriaAttiva;
    const matchDisponibili = !soloDisponibili || libro.copieDisponibili > 0;
    return matchCerca && matchCategoria && matchDisponibili;
  });

  return (
    <Box component="section" id="catalogo" sx={{ py: 8 }}>
      <Container maxWidth="lg">

        {/* TITOLO */}
        <SectionTitle title="Catalogo Libri" subtitle="Sfoglia l'intera collezione" />


        {/* BARRA DI RICERCA */}
        <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', px: 3, py: 1, borderRadius: 4, mb: 4, gap: 2 }}>
          <SearchIcon color='primary' />
          <InputBase
            fullWidth
            placeholder="Cerca titolo o autore..."
            value={cerca}
            onChange={e => setCerca(e.target.value)}
            sx={{ fontSize: '1rem' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={soloDisponibili}
                onChange={e => setSoloDisponibili(e.target.checked)}
                color='primary'
              />
            }
            label="Solo disponibili"
            sx={{ whiteSpace: 'nowrap', color: 'text.secondary', mr: 0 }}
          />

        </Paper>

        {/* FILTRI CATEGORIE */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 5, }}>
          {categorie.map(cat => (
            <Button
              key={cat.label}
              onClick={() => setCategoriaAttiva(cat.label)}
              variant={categoriaAttiva === cat.label ? 'contained' : 'outlined'}
              size="small"
              sx={{
                borderRadius: 10,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                px: 2,
                backgroundColor: categoriaAttiva === cat.label ? 'primary.main' : 'background.card',
                '&:hover': {
                  backgroundColor: categoriaAttiva === cat.label ? 'primary.dark' : 'background.default',
                }
              }}
            >
              {cat.label}
            </Button>
          ))}
        </Box>

        {/* GRIGLIA LIBRI */}
        <Grid container spacing={3}>
          {libriFiltrati.map(libro => {
            const giaPrenotato = libriPrenotatiIds.includes(libro._id.toString());
            const isDisponibile = libro.copieDisponibili > 0;

            return (
              <Grid key={libro._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 4, // Angoli più morbidi come nel mock
                    border: '1px solid',
                    borderColor:'bookcard.border',
                    overflow: 'hidden',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)', // Effetto sollevamento fluido
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
                      borderColor: 'bookcard.borderHover'
                    }
                  }}
                >
                  {/* Intestazione Card: Simula una copertina premium stilizzata */}
                  <Box sx={{ 
                    height: 120, 
                    background: 'linear-gradient(135deg, #1a2e46 0%, #3b597e 100%)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    p: 2.5, 
                    position: 'relative',
                    color: 'white'
                  }}>
                    {/* Elemento geometrico decorativo di sfondo */}
                    <Box sx={{
                      position: 'absolute',
                      right: -15,
                      bottom: -15,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.07)'
                    }} />

                    {/* Badge della categoria in alto a sinistra */}
                    <Chip 
                      label={libro.categoria || 'Generale'} 
                      size="small" 
                      sx={{ 
                        alignSelf: 'flex-start', 
                        bgcolor: 'rgba(255, 255, 255, 0.18)', 
                        color: 'white', 
                        fontWeight: 700, 
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />

                    {/* Ubicazione fisica */}
                    <Typography variant="caption" sx={{color:'white', fontWeight: 600, alignSelf: 'flex-end', letterSpacing: 0.5 }}>
                      SCAFFALE {libro.scaffale}
                    </Typography>
                  </Box>

                  {/* Corpo principale della Card */}
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, pt: 2.5 }}>
                    
                    {/* Titolo */}
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5, lineHeight: 1.3, fontSize: '1.05rem' }}>
                      {libro.titolo}
                    </Typography>

                    {/* Autore */}
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontWeight: 500 }}>
                      di {libro.autore}
                    </Typography>

                    {/* Spinge i dettagli informativi fissi verso il fondo */}
                    <Box sx={{ mt: 'auto' }} />

                    {/* Contenitore interno per lo Stato delle Copie */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      bgcolor: 'background.default', 
                      p: 1.5, 
                      borderRadius: 2.5, 
                      border: '1px solid',
                      borderColor:'bookcard.border' 
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: giaPrenotato ? 'warning.main' : (isDisponibile ? 'success.main' : 'warning.disabled')
                        }} />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: 'text.secondary' }}>
                          {giaPrenotato ? 'In tuo possesso' : (isDisponibile ? 'Disponibile' : 'Esaurito')}
                        </Typography>
                      </Box>
                      
                      <Typography variant="caption" fontWeight="bold" sx={{ color: 'text.secondary' }}>
                        {libro.copieDisponibili} / {libro.copieTotali} Copie
                      </Typography>
                    </Box>
                  </CardContent>

                  {/* Sezione Pulsante Azione */}
                  <Box sx={{ px: 3, pb: 3, pt: 0 }}>
                    {giaPrenotato ? (
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleRestituisciLibro(libro._id)}
                        sx={{ 
                          textTransform: 'none', 
                          fontWeight: 700, 
                          borderRadius: 2.5, 
                          bgcolor: 'warning.main',                          
                          '&:hover': { bgcolor: 'warning.dark', boxShadow: 'none' }
                        }}
                      >
                        Restituisci libro
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={!isDisponibile}
                        onClick={() => handlePrenotaLibro(libro._id)}
                        sx={{ 
                          bgcolor: 'secondary.main',
                          textTransform: 'none', 
                          fontWeight: 700, 
                          borderRadius: 2.5,                          
                          '&:hover': { bgcolor: 'secondary.dark', boxShadow: 'none' }
                        }}
                      >
                        {isDisponibile ? 'Richiedi in prestito' : 'Non disponibile'}
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

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

      </Container>
    </Box>
  );
}

export default Catalogo;


/*function Catalogo(){

    return(
        <>
            <section className="main__catalogo" id="catalogo">
                <h1 className="main__catalogo__title">Catalogo Libri</h1>
                <p className="main__catalogo__subtitle">Sfoglia l'intera collezione</p>
                <div className="catalogo__cerca">
                    <label className="catalogo__cerca__label" htmlFor="catalogo__cerca">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    </label>

                    <input type="search" id="catalogo__cerca" className="catalogo__cerca__input" placeholder="Cerca titolo o autore..."/>

                    <input type="checkbox" id="disponibili" className="catalogo__cerca__checkbox" />
                    <label htmlFor="disponibili">Solo Disponibili</label>
                </div>

                <div className="catalogo__filtri">
                    <div className="catalogo__filtri__button">
                        <input type="radio" value ="tutti" id="tutti" name="filtri" defaultChecked/> <label htmlFor="tutti">Tutti</label>
                        <input type="radio" value ="informatica" id="informatica" name="filtri"/> <label htmlFor="informatica">Informatica</label>
                        <input type="radio" value = "storia" id="storia" name="filtri"/> <label htmlFor="storia">Storia</label>
                        <input type="radio" value ="italiano" id="italiano" name="filtri"/> <label htmlFor="italiano">Italiano</label>

                    </div>
                </div>
            
            
            </section>
        </>
    );
}

export default Catalogo;

*/