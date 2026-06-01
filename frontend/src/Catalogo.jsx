import {
  Box, Container, Typography, Paper, InputBase,
  FormControlLabel, Checkbox, Button, Grid,
  Card, CardContent, Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import SectionTitle from './SectionTitle';
import { useState, useEffect } from 'react';

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

  // Carica libri dal backend
  const fetchLibri = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/libri");
      if (res.ok) setLibri(await res.json());
    } catch (err) {
      console.error("Errore caricamento libri:", err);
    }
  };

//prenotazione libro
const fetchLibriPrenotati = async () => {
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      setLibriPrenotatiIds([]);
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/auth/profilo", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const ids = (data.libriPrenotati || []).map(l => l._id || l);
        setLibriPrenotatiIds(ids.map(id => id.toString()));
      }
    } catch (err) {
      console.error("Errore caricamento profilo:", err);
    }
  };

    useEffect(() => {
    fetchLibri();
    fetchLibriPrenotati();

    const aggiorna = () => { fetchLibri(); fetchLibriPrenotati(); };
    window.addEventListener("aggiornaDati", aggiorna);
    
    window.addEventListener("loginEffettuato", fetchLibriPrenotati);
    
    return () => {
        window.removeEventListener("aggiornaDati", aggiorna);
        window.removeEventListener("loginEffettuato", fetchLibriPrenotati); // ✅
    };
}, []);


  // Prenotazione libro
  const handlePrenotaLibro = async (idLibro) => {
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      alert("Devi effettuare il login per poter prenotare un libro!");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/libri/${idLibro}/prenota`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Libro prenotato con successo! Lo troverai in 'Le mie prenotazioni'.");
        setLibriPrenotatiIds(prev => [...prev, idLibro]);
        setLibri(prev => prev.map(l =>
          l._id === idLibro ? { ...l, copieDisponibili: l.copieDisponibili - 1 } : l
        ));
        window.dispatchEvent(new Event("aggiornaDati"));
      } else {
        const data = await res.json();
        alert("Errore: " + data.messaggio);
      }
    } catch (err) { console.error(err); }
  };

  // Restituzione libro
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
        setLibriPrenotatiIds(prev => prev.filter(id => id !== idLibro));
        setLibri(prev => prev.map(l =>
          l._id === idLibro ? { ...l, copieDisponibili: l.copieDisponibili + 1 } : l
        ));
        window.dispatchEvent(new Event("aggiornaDati"));
      } else {
        const data = await res.json();
        alert("Errore: " + data.messaggio);
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
      <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', px: 3, py: 1, borderRadius: 4, mb: 4, gap: 2 }}>
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
          return (
            <Grid key={libro._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ /* ... I tuoi stili Card ... */ borderTop: '4px solid #16a34a', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    {/* ... Icona, Titolo, Autore, Descrizione ... */}
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{libro.titolo}</Typography>
                      <Typography variant="body2">{libro.autore}</Typography>
                    </Box>
                  </Box>

                  {/* Copie: Mostriamo dinamicamente Disponibili/Totali */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Chip
                      label={`✓ ${libro.copieDisponibili}/${libro.copieTotali} COPIE`}
                      size="small"
                      sx={{ backgroundColor: '#d1fae5', color: '#065f46', fontWeight: 'bold' }}
                    />
                    <Typography variant="caption">Scaffale {libro.scaffale}</Typography>
                  </Box>
                </CardContent>

                <Box sx={{ px: 2, pb: 2 }}>
                    {giaPrenotato ? (
                      /* Pulsante RESTITUISCI — se il libro è già prenotato dall'utente */
                      <Button
                        fullWidth
                        variant="outlined"
                        color="warning"
                        onClick={() => handleRestituisciLibro(libro._id)}
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                      >
                        Restituisci libro
                      </Button>
                    ) : (
                      /* Pulsante PRENOTA — se non è prenotato */
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={libro.copieDisponibili === 0}
                        onClick={() => handlePrenotaLibro(libro._id)}
                        sx={{ backgroundColor: '#1a2e46', textTransform: 'none', fontWeight: 600 }}
                      >
                        {libro.copieDisponibili > 0 ? 'Prenota' : 'Non disponibile'}
                      </Button>
                    )}
                  </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

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