import React from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mt: 'auto' }}>
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
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AutoStoriesIcon sx={{ color: '#38BDF8', fontSize: 30 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#DCA743', fontFamily: 'serif' }}>
                            BiblioUnisa
                        </Typography>
                    </Stack>

                    {/* TESTO */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 0.5 }}>
                            © 2026 Università degli Studi di Salerno — Sistema Bibliotecario
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                            Progetto universitario — Fondamenti del Web A.A. 2025/2026
                        </Typography>
                    </Box>

                </Box>
                
            </Container>
        </Box>
    );
}

export default Footer;