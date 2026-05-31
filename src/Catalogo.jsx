import { Box, Container, Typography, Paper, InputBase, 
         FormControlLabel, Checkbox, Button, Grid, 
         Card, CardContent, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import SectionTitle from './SectionTitle';

const categorie = [
  { label: 'Tutti', emoji: '🗂️' },
  { label: 'Informatica', emoji: '💻' },
  { label: 'Matematica', emoji: '📐' },
  { label: 'Fisica', emoji: '🔬' },
  { label: 'Ingegneria', emoji: '⚙️' },
  { label: 'Chimica', emoji: '🧪' },
  { label: 'Biologia', emoji: '🚀' },
  { label: 'Lettere', emoji: '📖' },
  { label: 'Diritto', emoji: '⚖️' },
  { label: 'Economia', emoji: '📝' },
  { label: 'Medicina', emoji: '🏥' },
  { label: 'Filosofia', emoji: '🤔' },
  { label: 'Storia', emoji: '🏛️' },
];

const libri = [
  { id: 1, titolo: 'Algoritmi e Strutture Dati', autore: 'Thomas H. Cormen', descrizione: 'Il testo fondamentale per lo studio degli algoritmi.', copie: '3/5', scaffale: 'A1', categoria: 'Informatica', top: true, colore: '#7c3aed', emoji: '💻' },
  { id: 2, titolo: 'Reti di Calcolatori', autore: 'Andrew S. Tanenbaum', descrizione: 'Principi e protocolli delle reti informatiche.', copie: '2/4', scaffale: 'A2', categoria: 'Informatica', top: true, colore: '#7c3aed', emoji: '💻' },
  { id: 3, titolo: 'Calcolo Differenziale e Integrale', autore: 'James Stewart', descrizione: 'Il classico testo di analisi matematica.', copie: '5/8', scaffale: 'B1', categoria: 'Matematica', top: true, colore: '#6d28d9', emoji: '📐' },
  { id: 4, titolo: 'Fisica Moderna', autore: 'Paul Tipler', descrizione: 'Meccanica quantistica e relatività.', copie: '1/3', scaffale: 'C1', categoria: 'Fisica', top: false, colore: '#0ea5e9', emoji: '🔬' },
  { id: 5, titolo: 'Diritto Privato', autore: 'Pietro Rescigno', descrizione: 'Fondamenti del diritto privato italiano.', copie: '4/6', scaffale: 'D2', categoria: 'Diritto', top: false, colore: '#d97706', emoji: '⚖️' },
  { id: 6, titolo: 'Storia Contemporanea', autore: 'Giovanni Sabbatucci', descrizione: 'Dal dopoguerra ai giorni nostri.', copie: '2/2', scaffale: 'E1', categoria: 'Storia', top: false, colore: '#b45309', emoji: '🏛️' },
];

function Catalogo() {
  const [cerca, setCerca] = React.useState('');
  const [soloDisponibili, setSoloDisponibili] = React.useState(false);
  const [categoriaAttiva, setCategoriaAttiva] = React.useState('Tutti');

  const libriFiltrati = libri.filter(libro => {
    const matchCerca = libro.titolo.toLowerCase().includes(cerca.toLowerCase()) || libro.autore.toLowerCase().includes(cerca.toLowerCase());
    const matchCategoria = categoriaAttiva === 'Tutti' || libro.categoria === categoriaAttiva;
    const matchDisponibili = !soloDisponibili || parseInt(libro.copie.split('/')[0]) > 0;
    return matchCerca && matchCategoria && matchDisponibili;
  });

  return (
    <Box component="section" id="catalogo" sx={{py: 8 }}>
      <Container maxWidth="lg">

        {/* TITOLO */}
        <SectionTitle title="Catalogo Libri" subtitle="Sfoglia l'intera collezione" />   
        

        {/* BARRA DI RICERCA */}
        <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', px: 3, py:1, borderRadius: 4, mb: 4, gap: 2 }}>
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 5 }}>
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
                fontSize: '0.9rem',
                px: 2,
                backgroundColor: categoriaAttiva === cat.label ? '#1a2e46' : 'white',
                color: categoriaAttiva === cat.label ? 'white' : '#374151',
                borderColor: '#d1d5db',
                '&:hover': {
                  backgroundColor: categoriaAttiva === cat.label ? '#1a2e46' : '#f3f4f6',
                  borderColor: '#9ca3af',
                }
              }}
            >
              {cat.emoji} {cat.label}
            </Button>
          ))}
        </Box>

        {/* GRIGLIA LIBRI */}
        <Grid container spacing={3}>
          {libriFiltrati.map(libro => {
            const copieDisponibili = parseInt(libro.copie.split('/')[0]);
            return (
              <Grid item xs={12} sm={6} md={4} key={libro.id}>
                <Card sx={{
                  borderRadius: 3,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  borderTop: '4px solid #16a34a',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}>

                  <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                    {/* Header: icona + titolo + autore */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2, pr: libro.top ? 6 : 0 }}>
                      <Box sx={{
                        width: 52, height: 52,
                        backgroundColor: libro.colore,
                        borderRadius: 2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.4rem',
                        flexShrink: 0,
                      }}>
                        {libro.emoji}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a2e46', lineHeight: 1.3 }}>
                          {libro.titolo}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          {libro.autore}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Descrizione */}
                    <Typography variant="body2" sx={{ color: '#4b5563', mb: 2 }}>
                      {libro.descrizione}
                    </Typography>

                    {/* Copie + Scaffale */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Chip
                        label={`✓ ${libro.copie} COPIE`}
                        size="small"
                        sx={{
                          backgroundColor: '#d1fae5',
                          color: '#065f46',
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                        Scaffale {libro.scaffale}
                      </Typography>
                    </Box>
                  </CardContent>

                  {/* Pulsante Prenota */}
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={copieDisponibili === 0}
                      sx={{
                        backgroundColor: '#1a2e46',
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': { backgroundColor: '#2a4a6b' },
                        '&.Mui-disabled': { backgroundColor: '#e5e7eb', color: '#9ca3af' }
                      }}
                    >
                      {copieDisponibili > 0 ? 'Prenota' : 'Non disponibile'}
                    </Button>
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