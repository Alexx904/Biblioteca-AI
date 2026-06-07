import React, { useState } from 'react';
import { Fab, Paper, Typography, TextField, Box, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const WidgetChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputTesto, setInputTesto] = useState('');
  const [messaggi, setMessaggi] = useState([
    { mittente: 'ai', testo: "Ciao! Sono l'AI. Come posso aiutarti?" }
  ]);

  // 1. Aggiungiamo 'async' per dire a React che questa funzione contiene operazioni di rete che richiederanno tempo
  const gestisciInvio = async () => {
    if (inputTesto.trim() !== '') {
      // Salviamo il testo in una costante prima di svuotare l'input
      const testoInviato = inputTesto;

      // 2. Aggiorniamo subito la chat per mostrare il messaggio dell'utente.
      // NOTA DA PROF: Usiamo (prevMessaggi => ...) invece di [...messaggi, ...]
      // Questa è una "Best Practice" in React. Siccome gli aggiornamenti di stato
      // sono asincroni, così siamo sicuri di agganciare il nuovo messaggio all'ultimissima 
      // versione della lista, evitando bug in cui i messaggi si sovrascrivono.
      setMessaggi(prevMessaggi => [...prevMessaggi, { mittente: 'user', testo: testoInviato }]);
      setInputTesto('');

      try {
        // --- LA MAGIA DELLA RETE (Fetch API) ---
        // 'await' mette in pausa l'esecuzione di QUESTA funzione finché il server Node.js non risponde,
        // ma non blocca l'interfaccia utente (puoi ancora scorrere la pagina o cliccare la X).
        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST", // Coincide con il router.post che abbiamo creato nel backend
            headers: {
                // Spieghiamo al server che formato stiamo usando. 
                // Questo fa scattare l'app.use(express.json()) nel tuo server.js!
                "Content-Type": "application/json" 
            },
            // JSON.stringify trasforma il nostro oggetto JavaScript in una stringa di testo 
            // perché su Internet i dati viaggiano sempre come puro testo.
            body: JSON.stringify({ messaggioUtente: testoInviato }) 
        });

        // 'await' di nuovo: aspettiamo che la stringa di testo ricevuta dal server 
        // venga "decodificata" e ritrasformata in un oggetto JavaScript utilizzabile.
        const data = await response.json();

        // 3. Il server ha risposto! Aggiungiamo la risposta dell'AI alla cronologia.
        setMessaggi(prevMessaggi => [...prevMessaggi, { mittente: data.mittente, testo: data.testo }]);

      } catch (error) {
        console.error("Errore di comunicazione col server:", error);
        // Se il server è spento o c'è un errore, mostriamo un messaggio utile
        setMessaggi(prevMessaggi => [...prevMessaggi, { mittente: 'ai', testo: "Scusa, i miei server sono momentaneamente irraggiungibili." }]);
      }
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