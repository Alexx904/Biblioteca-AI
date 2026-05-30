import { Box, Container, Grid, Typography, Button, Stack, Card, CardContent, Chip } from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import HeroCard from './HeroCard';


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
                <Stack direction="row" spacing={2} useFlexGap sx={{ mb: 4, flexWrap: 'wrap' }}> {/*flexWrap permette ai bottoni di andare a capo se lo schermo è troppo stretto*/}
                  <Button variant="contained"
                    href="#catalogo"
                    startIcon={<BookmarksIcon />} 
                    color="primary"                    
                    size='large'
                    sx={{fontWeight: 'bold',flex:1, minWidth: 255, '&:hover': { color: 'secondary.light' } }}> {/* flex:1 e minWidth insieme permettono ai bottoni di espandersi in modo uniforme e di andare a capo se lo schermo è troppo stretto*/}
                    Esplora il Catalogo
                  </Button>
                  <Button 
                    variant="outlined"                
                    href="#postazioni"
                    startIcon={<ChairAltIcon />}
                    color="primary"                    
                    size='large'
                    sx={{fontWeight: 'bold',flex:1, minWidth: 255, '&:hover': {color: 'secondary.main' } }}>
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
                  sx={{ width: '100%', height: '100%', borderRadius: 4, boxShadow: 5, objectFit: 'cover' }}
                />
              </Box>              
            </Box>
            {/* Sezione Info: Volumi, Postazioni, Orari */}
            <Stack direction={'row'} spacing={2} useFlexGap sx={{flexWrap:'wrap'}}> {/*flexWrap serve per mandare a capo gli elementi dello stack se non c'è spazio */}
              <HeroCard title='Volumi in catalago' value='12000'/>
              <HeroCard title='Postazioni studio' value='30'/>
              <HeroCard title='Orario di apertura' value='8:00-20:00'/>
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
