import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import SectionTitle from './SectionTitle';
function Informazioni() {
    // Stile condiviso per tutte le carte
    const cardStyle = {
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Ombra morbidissima
        height: '100%',
        backgroundColor: '#ffffff'
    };

    return (
        <Box component="section" id="informazioni" sx={{ py: 8, bgcolor: '#f8fafc' }}>
            <Container maxWidth="md">

                {/* Titolo e Linea d'accento */}
                <SectionTitle title="Dove Trovarci" subtitle="Scopri tutti i nostri contatti" />

                {/* Griglia delle carte */}
                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>

                    {/* Carta 1: Indirizzo */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper sx={cardStyle} elevation={0}>
                            <LocationOnIcon sx={{ fontSize: 40, color: '#e91e63', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a2e46', mb: 2 }}>Indirizzo</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                Viale della Conoscenza, 7<br />Bari (BA) 70125
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Carta 2: Orari */}
                    <Grid size={{xs:12, sm:6, md:3}}>
                        <Paper sx={cardStyle} elevation={0}>
                            <AccessTimeIcon sx={{ fontSize: 40, color: '#64748b', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a2e46', mb: 2 }}>Orari</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                Lun–Sab: 8:00–20:00<br />Dom: chiuso
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Carta 3: Telefono */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper sx={cardStyle} elevation={0}>
                            <PhoneIcon sx={{ fontSize: 40, color: '#e91e63', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a2e46', mb: 2 }}>Telefono</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                +39 080 996 21<br />info@novalibrary.it
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Carta 4: Servizi */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper sx={cardStyle} elevation={0}>
                            <LanguageIcon sx={{ fontSize: 40, color: '#38BDF8', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a2e46', mb: 2 }}>Servizi</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                30 postazioni studio<br />12.000+ volumi<br />Wi-Fi gratuito
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}
/*
return (
    <>
        <section className="informazioni">
            <h1 className="informazioni__title">Informazioni</h1>
            <div className="main__informazione">
                <div className="info-card">
                    <h3>Indirizzo</h3>
                    <p>Via Giovanni Paolo II, 132<br/>Fisciano (SA) 84084</p>
                </div>
                <div className="info-card">
                    <h3>Orari</h3>
                    <p>Lun–Ven: 8:00–22:00<br/>Sab-Dom: chiuso</p>
                </div>
                <div className="info-card">
                    <h3>Contatti</h3>
                    <p>+39 089 96 2111<br/>biblioteca@unisa.it</p>
                </div>
            </div>
        </section>
    </>
);
}
*/
export default Informazioni;