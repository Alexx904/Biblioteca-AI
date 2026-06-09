import React from 'react';
import { Box, Typography, Stack, Container, Avatar } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'navbar.main', color: 'text.primary', py: 4, mt: 'auto' }}>
            <Container maxWidth="lg">
                
                {/* Il Box che raggruppa Logo e Testo e li mette ESATTAMENTE al centro */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center', // Spinge il blocco al centro!
                    gap: { xs: 2, md: 6 } // Spazio tra il logo e il testo
                }}>
                    
                    {/* LOGO */}
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Avatar variant="square" src="img/logo.png" alt="logo" sx={{height:60, width:60}}/>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'secondary.main', fontFamily: 'serif' }}>
                            Nova
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'navbar.contrastText', fontFamily: 'serif' }}>
                            Library
                        </Typography>
                    </Stack>

                    {/* TESTO */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="body2" sx={{ color: 'navbar.contrastText', mb: 0.5 }}>
                            © 2026 Nova Library — Sistema Bibliotecario Digitale
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'navbar.contrastText' }}>
                            Progetto universitario — Fondamenti del Web A.A. 2025/2026
                        </Typography>
                    </Box>

                </Box>
                
            </Container>
        </Box>
    );
}

export default Footer;