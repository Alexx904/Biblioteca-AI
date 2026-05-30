import { Box, Container, Grid, Typography, Button, Stack, Card, CardContent, Chip } from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ChairAltIcon from '@mui/icons-material/ChairAlt';


function Hero(){
    return(
        <Box component="section" sx={{py:6, overflow: 'hidden'}}> {/*Box che contiene tutta la sezione Hero. Padding verticale per saccare dalla NavBar e overflow hidden nasconde gli elementi che escono dalla box*/}
          <Container maxWidth="lg"> {/*Limita la larghezza (maxWidth="lg"): Evita che il testo e le immagini si allunghino troppo sui monitor molto larghi, migliorando la leggibilità. Mette i contenuti al centro*/}
            {/* Box che contiente sezione sinistra(Testi e pulsanti) e destra(immagine) */}
            <Box sx={{
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, //Elementi in colonna su schermi piccoli, affiancati su schermi più grandi
              alignItems: 'stretch', //Allinea le due colonne in altezza, evitando che una sia più alta dell'altra
              gap: 6 //spazio tra le due colonne (testo e immagine)
              }}> 

              {/* COLONNA SINISTRA: Testi e Pulsanti */}
              <Box sx={{flex: 1, minWidth: 0}}> {/*flex:1 permette alla colonna di occupare tutto lo spazio disponibile, minWidth:0 evita che il testo si restringa troppo su schermi piccoli*/}
                {/* <Chip 
                label="UNIVERSITÀ DEGLI STUDI" 
                sx={{                 
                mb: 3, 
                fontWeight: 'bold',
                letterSpacing: 1
                }} 
                /> */}
            
                <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'serif' }}>
               Biblioteca 
                <Typography variant="h2" component="h1" sx={{fontWeight: 'bold', fontFamily: 'serif', color:'secondary.main' }}>
                Universitaria
                </Typography>
                Digitale
                </Typography>
            
                <Typography variant="subtitle1" sx={{color:"text.secondary", mb: 4, fontSize: '1.25rem' }}> 
              Prenota libri, riserva postazioni di studio, chatta.
                <br /> La tua biblioteca è sempre con te.
                </Typography>
            
                {/* Bottoni */}
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  <Button variant="contained"
                  href="#catalogo"
                  startIcon={<BookmarksIcon />} 
                  color="primary"
                  fullWidth 
                  sx={{fontWeight: 'bold', '&:hover': { color: 'secondary.light' } }}> 
                  Esplora il Catalogo
                  </Button>
                  <Button 
                    variant="outlined"                
                    href="#postazioni"
                    startIcon={<ChairAltIcon />}
                    color="primary"
                    fullWidth
                    sx={{fontWeight: 'bold', '&:hover': {color: 'secondary.main' } }}>
                    Prenota Postazione
                  </Button>
                </Stack>
              </Box>
              {/* COLONNA DESTRA: immagine hero */}
              <Box sx={{ flex: 1, minWidth: 0, display: 'flex', mb:4 }}> 
                <Box
                  component="img"
                  src="img/hero.jpg"
                  alt="Foto Biblioteca"
                  sx={{ width: '100%', height: '100%', borderRadius: 2, boxShadow: 3, objectFit: 'cover' }}
                />
              </Box>

              
            </Box>
            <Stack direction="row" spacing={2}>
                {/* Card Principale: Volumi */}
                <Card  sx={{backgroundColor: 'background.card',border: '1px solid ', borderRadius: 3 }}>
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Volumi in catalogo</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>12.000+</Typography>
                    </Box>
                    <Chip label="Aggiornato" color="success" size="small" sx={{ backgroundColor: '#a4d4b4', color: 'text.primary', fontWeight: 'bold' }} />
                  </CardContent>
                </Card>

                {/* Due card affiancate per Postazioni e Orari */}
                <Stack direction="row" spacing={2}>
                  <Card sx={{ flex: 1, backgroundColor: 'background.card', color: 'text.primary', border: '1px solid ', borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Postazioni Studio</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>36</Typography>
                      <Typography variant="caption" sx={{ color: '#a4d4b4' }}>3 aule disponibili</Typography>
                    </CardContent>
                  </Card>

                  <Card sx={{ flex: 1, backgroundColor: 'background.card', color: 'text.primary', border: '1px solid ', borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Orari di Apertura</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>8:00 - 22:00</Typography>
                      <Typography variant="caption" sx={{ color: '#d4b86a' }}>Aperto ora</Typography>
                    </CardContent>
                  </Card>
                </Stack>
            </Stack>
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
