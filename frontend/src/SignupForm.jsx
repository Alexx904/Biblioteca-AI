import React, { useState } from "react";
import {
  Box, Tabs, Tab, TextField, Button, Typography,
  InputAdornment, IconButton, Alert
} from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";

export default function SignupForm({ onLoginSuccess }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [errore, setErrore] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [matricola, setMatricola] = useState("");
  const [facolta, setFacolta] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setErrore("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",          // Riceve i cookie httpOnly dal backend
        body: JSON.stringify({ email, password })
      });
      const risultato = await response.json();
      if (response.status === 200) {
        // Il token è ora in un cookie httpOnly 
        window.dispatchEvent(new Event("loginEffettuato"));
        onLoginSuccess(risultato.utente);
      } else {
        setErrore(risultato.messaggio);
      }
    } catch (error) {
      setErrore("Impossibile collegarsi al server.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/registrazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nome, matricola, facolta, email, password })
      });
      const risultato = await response.json();
      if (response.status === 200) {
        alert("Registrazione completata! Ora puoi fare il login.");
        setTabIndex(0);
        setPassword("");
      } else {
        setErrore(risultato.messaggio);
      }
    } catch (error) {
      setErrore("Impossibile collegarsi al server.");
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const adornmentOcchio = (
    <InputAdornment position="end">
      <IconButton onClick={togglePassword} edge="end" size="small">
        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h5" color="primary" sx={{ fontWeight: "bold", mb: 2, fontFamily: "serif" }}>
        Biblioteca
      </Typography>

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
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="small" />
                  </InputAdornment>
                ),
              }
            }}
          />
          <TextField
            label="Password" variant="outlined" size="small"
            type={showPassword ? "text" : "password"} required fullWidth
            value={password} onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: { endAdornment: adornmentOcchio }
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
            label="Password" size="small"
            type={showPassword ? "text" : "password"} required fullWidth
            value={password} onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: { endAdornment: adornmentOcchio }
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