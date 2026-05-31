import React, { useState } from "react";
import { 
  Box, Tabs, Tab, TextField, Button, Typography, 
  InputAdornment, IconButton, Alert 
} from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";

export default function SignupForm({ onLoginSuccess }) {
  const [tabIndex, setTabIndex] = useState(0); // 0 = Login, 1 = Registrazione
  const [showPassword, setShowPassword] = useState(false);
  const [errore, setErrore] = useState("");

  // Stati per i campi del form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [matricola, setMatricola] = useState("");
  const [facolta, setFacolta] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setErrore(""); // Pulisce gli errori quando cambi tab
  };

  // ----- LOGICA DI LOGIN -----
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const risultato = await response.json();

      if (response.status === 200) {
        onLoginSuccess(risultato.utente); // Passa i dati dell'utente alla NavBar!
        console.log("Utente loggato")
      } else {
        setErrore(risultato.messaggio);
        console.log(risultato.messaggio)
      }
    } catch (error) {
      setErrore("Impossibile collegarsi al server.");
    }
  };

  // ----- LOGICA DI REGISTRAZIONE -----
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/registrazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, matricola, facolta, email, password })
      });
      const risultato = await response.json();

      if (response.status === 200) {
        alert("Registrazione completata! Ora puoi fare il login.");
        setTabIndex(0); // Torna automaticamente alla tab di Login
        setPassword(""); // Pulisce la password per sicurezza
      } else {
        setErrore(risultato.messaggio);
      }
    } catch (error) {
      setErrore("Impossibile collegarsi al server.");
    }
  };

  // Bottone occhio per la password
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography color="primary" variant="h5" gutterBottom sx={{ fontWeight: "bold", fontFamily: "serif" }}>
        Biblioteca
      </Typography>

      {/* Le Tab Accedi/Registrati */}
      <Tabs indicatorColor="secondary" value={tabIndex} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
        <Tab label="Accedi" sx={{ fontWeight: "bold" }} />
        <Tab label="Registrati" sx={{ fontWeight: "bold" }} />
      </Tabs>

      {errore && <Alert severity="error" sx={{ mb: 2 }}>{errore}</Alert>}

      {/* FORM DI LOGIN */}
      {tabIndex === 0 && (
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            label="Email" variant="outlined" size="small" type="email" required fullWidth
            value={email} onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><AccountCircle fontSize="small" /></InputAdornment>,
            }}
          />
          <TextField
            label="Password" variant="outlined" size="small" type={showPassword ? "text" : "password"} required fullWidth
            value={password} onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end" size="small">
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1, borderRadius: 5 }}>
            Entra
          </Button>
        </form>
      )}

      {/* FORM DI REGISTRAZIONE */}
      {tabIndex === 1 && (
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField label="Nome completo" size="small" required fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
          <TextField label="Matricola" size="small" required fullWidth value={matricola} onChange={(e) => setMatricola(e.target.value)} />
          <TextField label="Facoltà" size="small" required fullWidth value={facolta} onChange={(e) => setFacolta(e.target.value)} />
          <TextField label="Email" type="email" size="small" required fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField
            label="Password" size="small" type={showPassword ? "text" : "password"} required fullWidth
            value={password} onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end" size="small">
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1, borderRadius: 5 }}>
            Crea Account
          </Button>
        </form>
      )}
    </Box>
  );
}