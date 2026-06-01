import React, { useState } from 'react';
import { Fab, Paper, Typography, TextField, Box, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const WidgetChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputTesto, setInputTesto] = useState('');
  
  // --- NUOVO STATO: ARRAY DEI MESSAGGI ---
  // Inizializziamo la chat con un messaggio di benvenuto dell'AI
  const [messaggi, setMessaggi] = useState([
    { mittente: 'ai', testo: "Ciao! Sono l'AI. Come posso aiutarti?" }
  ]);

  const gestisciInvio = () => {
    if (inputTesto.trim() !== '') {
      // 1. Aggiungiamo il messaggio dell'utente alla lista esistente.
      // I "tre puntini" (...messaggi) indicano di prendere tutti i messaggi vecchi e aggiungere quello nuovo.
      setMessaggi([...messaggi, { mittente: 'user', testo: inputTesto }]);
      
      // 2. Svuotiamo l'input
      setInputTesto('');

      // NOTA DEL PROF: Qui in futuro faremo la chiamata (fetch) al tuo server Node.js 
      // per ottenere la vera risposta dell'AI e aggiungerla a questo array!
    }
  };

  return (
    <>
      {isOpen && (
        <Paper 
          elevation={4} 
          sx={{ position: 'fixed', bottom: 90, right: 20, p: 2, width: 300, height: 400, display: 'flex', flexDirection: 'column', zIndex: 1000 }}
        >
          {/* AREA DEI MESSAGGI */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {messaggi.map((msg, index) => (
              // Usiamo il Box per allineare a destra (utente) o a sinistra (AI)
              <Box key={index} sx={{ alignSelf: msg.mittente === 'user' ? 'flex-end' : 'flex-start' }}>
                <Typography variant="body2" 
                  sx={{ p: 1, borderRadius: 2, 
                    // Colori dinamici basati su chi scrive!
                    bgcolor: msg.mittente === 'user' ? 'primary.main' : 'grey.200',  // Utente = colore primario, AI = grigio chiaro
                    color: msg.mittente === 'user' ? 'white' : 'text.primary' 
                  }}
                >
                  {msg.testo}
                </Typography>
              </Box>
            ))}
          </Box>
          
          {/* AREA DI INPUT */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField size="small" fullWidth placeholder="Scrivi..." 
              value={inputTesto} 
              onChange={(e) => setInputTesto(e.target.value)} // Aggiorna lo stato ad ogni lettera digitata
              // Piccola comodità: invia anche premendo "Enter" sulla tastiera
              onKeyDown={(e) => e.key === 'Enter' && gestisciInvio()} 
            />
            <IconButton color="primary" onClick={gestisciInvio}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}


    {/* BOTTONE DI APERTURA/CHIUSURA DELLA CHAT */}
    <Fab color="primary" onClick={() => setIsOpen(!isOpen)} sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
    </Fab>
    </>
  );
};

export default WidgetChat;