import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function Chat() {
  return (
    <Box component="section" id="chat" sx={{ py: 6, bgcolor: '#ffffff' }}>
      <Container maxWidth="lg">

        {/* Banner con sfondo scuro */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            bgcolor: '#1a2e46', // Sfondo blu scuro per far risaltare la sezione
            color: 'white',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            boxShadow: '0 10px 30px rgba(26, 46, 70, 0.2)'
          }}
        >
          {/* Testo e Icona a sinistra */}
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex' }}>
              <SupportAgentIcon sx={{ fontSize: 50, color: '#DCA743' }} />
            </Box>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'serif', mb: 1 }}>
                Hai bisogno di aiuto?
              </Typography>
              <Typography variant="body1" sx={{ color: '#cbd5e1' }}>
                Consulta la nostra Intelligenza Artificiale per assistenza immediata sulla biblioteca.
              </Typography>
            </Box>
          </Stack>

          {/* Bottone a destra */}
          <Button
            variant="contained"
            size="large"
            onClick={() => window.dispatchEvent(new Event("apriChat"))} // <-- AGGIUNGI QUESTO
            sx={{
              bgcolor: '#DCA743',
              color: '#1a2e46',
              fontWeight: 'bold',
              borderRadius: 8,
              px: 4,
              py: 1.5,
              whiteSpace: 'nowrap',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#cfa03c' // Sostituisci i tuoi tre puntini con un colore hover reale
              }
            }}
          >
            Inizia la chat
          </Button>
        </Paper>

      </Container>
    </Box>
  );
}

export default Chat;