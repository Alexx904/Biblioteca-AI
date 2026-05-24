import { Box, Container, Grid, Typography, Button, Stack, Card, CardContent, Chip } from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ChairAltIcon from '@mui/icons-material/ChairAlt';

function Hero(){
    return(
        <Box 
      component="section" 
      sx={{ 
        backgroundColor: '#1a2e46',
        color: '#ffffff',
        py: { xs: 6, md: 10 },
        overflow: 'hidden'
      }}
        >
      <Container maxWidth="lg"> {/*Limita la larghezza (maxWidth="lg"): Evita che il testo e le immagini si allunghino troppo sui monitor molto larghi, migliorando la leggibilità.*/}
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          gap: 6
        }}>

          {/* COLONNA SINISTRA: Testi e Pulsanti */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Chip 
              label="UNIVERSITÀ DEGLI STUDI" 
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                color: '#d4b86a', // Colore oro
                mb: 3, 
                fontWeight: 'bold',
                letterSpacing: 1
              }} 
            />
            
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ fontWeight: 800, mb: 2, fontFamily: 'serif' }}
            >
              Biblioteca <br/>
              <span style={{ color: '#d4b86a' }}>Universitaria</span> <br/>
              Digitale
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4, color: '#a0b3c6', fontSize: '1.1rem' }}>
              Prenota libri, riserva postazioni di studio, chatta.
              <br/>La tua biblioteca è sempre con te.
            </Typography>
            
            {/* Sostituisce la tua <ul> con gli <a> */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 5 }}>
              <Button 
                variant="contained" 
                size="large"
                href="#catalogo"
                startIcon={<BookmarksIcon />}
                sx={{ 
                  backgroundColor: '#d4b86a', 
                  color: '#1a2e46',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#c2a558' }
                }}
              >
                Esplora il Catalogo
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                href="#postazioni"
                startIcon={<ChairAltIcon />}
                sx={{ 
                  borderColor: '#425a77', 
                  color: '#ffffff',
                  '&:hover': { borderColor: '#ffffff' }
                }}
              >
                Prenota Postazione
              </Button>
            </Stack>

            <Stack direction="row" spacing={2}>
              {/* Card Principale: Volumi */}
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid #2a415d', borderRadius: 3 }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#a0b3c6' }}>Volumi in catalogo</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>12.000+</Typography>
                  </Box>
                  <Chip label="Aggiornato" color="success" size="small" sx={{ backgroundColor: '#a4d4b4', color: '#1a2e46', fontWeight: 'bold' }} />
                </CardContent>
              </Card>

              {/* Due card affiancate per Postazioni e Orari */}
              <Stack direction="row" spacing={2}>
                <Card sx={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid #2a415d', borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ color: '#a0b3c6' }}>Postazioni Studio</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>36</Typography>
                    <Typography variant="caption" sx={{ color: '#a4d4b4' }}>3 aule disponibili</Typography>
                  </CardContent>
                </Card>

                <Card sx={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid #2a415d', borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ color: '#a0b3c6' }}>Orari di Apertura</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>8:00 - 22:00</Typography>
                    <Typography variant="caption" sx={{ color: '#d4b86a' }}>Aperto ora</Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Box>

          {/* COLONNA DESTRA: immagine hero */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              component="img"
              src="img/hero.jpg"
              alt="hero biblioteca"
              sx={{
                width: '100%',
                height: '500px',
                objectFit: 'cover',
                borderRadius: 4,
                boxShadow: 5,
                display: 'block',
              }}
            />
          </Box>

        </Box>
      </Container>
    </Box>
  );
}

/*
function Hero(){

    return(
        <>
            <section className="hero">
                <h1 className="hero__title">Biblioteca</h1>
                <p className="hero__text">Prenota libri, riserva postazioni di studio. La tua biblioteca è sempre con te.</p>
                <img className="hero__image" src="img/hero.jpg" alt="hero"/>
                <ul className="hero__link">
                    <li><a href="#catalogo">Esplora il catalogo</a></li>
                    <li><a href="#postazioni">Prenota postazione</a></li>
                </ul>

                <div className="hero__info">
                    <p className="hero__info__text"><span className="hero__info__number">12000+</span><br />Volumi in catalogo</p>
                    <p className="hero__info__text"><span className="hero__info__number">36</span><br />Postazioni Studio</p>
                    <p className="hero__info__text"><span className="hero__info__number">8:00-22:00</span><br />Orari di Apertura</p>
                    <p className="hero__info__text"><span className="hero__info__number">3</span><br />Aule disponibili</p>
                </div>
            </section>
        </>
    );
}
*/
export default Hero;
