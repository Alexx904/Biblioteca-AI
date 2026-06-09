import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function Chat() {
  return (
    <Box component="section" id="chat" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        
        {/* Banner con sfondo scuro */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            
          }}
        >
          {/* Testo e Icona a sinistra */}
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            <Box sx={{ p: 2, bgcolor: 'primary.dark', borderRadius: '50%', display: 'flex' }}>
              <SupportAgentIcon sx={{ fontSize: 50, color: 'secondary.accent' }} />
            </Box>
            <Box sx={{ textAlign:{ xs: 'center', md: 'left' }}}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'serif', mb: 1 }}>
                Hai bisogno di aiuto?
              </Typography>
              <Typography variant="body1">
                Consulta la nostra Intelligenza Artificiale per assistenza immediata sulla biblioteca.
              </Typography>
            </Box>
          </Stack>
          
          {/* Bottone a destra */}
          <Button 
            variant="contained" 
            size="large"
            onClick={() => window.dispatchEvent(new Event("apriChat"))}
            sx={{
              bgcolor: 'secondary.accent',
              color: 'primary.main',
              fontWeight: 'bold',
              borderRadius: 8,
              px: 4,
              py: 1.5,
              whiteSpace: 'nowrap',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'secondary.dark'
              }
            }}
          >
            Inizia la Chat
          </Button>
        </Paper>

      </Container>
    </Box>
  );
}

export default Chat;