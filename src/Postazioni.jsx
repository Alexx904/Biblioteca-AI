import React, { useState } from "react";
import { 
  Box, Container, Typography, TextField, 
  Paper, Stack, ToggleButton, ToggleButtonGroup, Chip
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";;
import MappaPostazioni from "./MappaPostazioni";
import SectionTitle from "./SectionTitle";


function Postazioni() {
    const [aula, setAula] = useState("aulaA");
    const [postoPrenotato, setPostoPrenotato] = useState(null);

    const handleAulaChange = (event, nuovaAula) => {
        if (nuovaAula !== null) {
            setAula(nuovaAula);
            setPostoPrenotato(null); // Resetta il posto se cambi aula
        }
    };

    return (
        //creazione Box con tag section
        <Box component="section" id="postazioni" sx={{ py: 8, bgcolor: '#f8fafc', minHeight: '100vh' }}>
            <Container maxWidth="lg">

                <SectionTitle title="Postazioni di Studio" subtitle="Seleziona aula, data e orario — poi clicca sulla postazione"/>

                {/* BARRA FILTRI */}
                <Paper elevation={0} sx={{
                    p: 3,
                    borderRadius: 4,
                    mb: 4,
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    alignItems: 'center'
                }}>

                    <Box sx={{ flex: 1, minWidth: 150 }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#6b7280', display: 'block', mb: 1 }}>
                            DATA
                        </Typography>
                        <TextField
                            fullWidth
                            id="date__postazione"
                            type="date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 150 }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#6b7280', display: 'block', mb: 1 }}>
                            ORA INIZIO
                        </Typography>
                        <TextField
                            fullWidth
                            id="ora__postazione"
                            type="time"
                            size="small"
                            inputProps={{ min: "08:00", max: "21:30" }}
                            InputLabelProps={{ shrink: true }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Box>

                    <Box sx={{ flex: 2, minWidth: 200 }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#6b7280', display: 'block', mb: 1 }}>
                            AULA
                        </Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={aula}
                            exclusive
                            onChange={handleAulaChange}
                            size="small"
                            sx={{
                                '& .MuiToggleButton-root': {
                                    borderRadius: 8,
                                    px: 3,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    borderColor: '#e5e7eb',
                                    mx: 0.5,
                                    '&.Mui-selected': {
                                        bgcolor: '#1a2e46',
                                        color: 'white',
                                        '&:hover': { bgcolor: '#2a4a6b' }
                                    }
                                },
                            }}
                        >
                            <ToggleButton value="aulaA">Aula A</ToggleButton>
                            <ToggleButton value="aulaB">Aula B</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Paper>

                {/* PILLOLE RIASSUNTIVE STATO POSTI */}
                <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap', useFlexGap: true }}>
                    <Chip
                        icon={<CircleIcon sx={{ fontSize: '12px !important', color: '#10b981' }} />}
                        label="Libere"
                        sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', fontWeight: 'bold', px: 1, borderRadius: 2 }}
                    />
                    <Chip
                        icon={<CircleIcon sx={{ fontSize: '12px !important', color: '#ef4444' }} />}
                        label="Occupate"
                        sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', fontWeight: 'bold', px: 1, borderRadius: 2 }}
                    />
                    {postoPrenotato && (
                        <Chip
                            icon={<CircleIcon sx={{ fontSize: '12px !important', color: '#3b82f6' }} />}
                            label={`Selezionata: ${postoPrenotato.id}`}
                            sx={{ bgcolor: '#eff6ff', border: '1px solid #bfdbfe', fontWeight: 'bold', color: '#1d4ed8', px: 1, borderRadius: 2, ml: 'auto !important' }}
                        />
                    )}
                </Stack>

                {/* MAPPA POSTAZIONI */}
                <MappaPostazioni
                    aulaSelezionata={aula}
                    postoSelezionato={postoPrenotato}
                    onPostazioneSelezionata={setPostoPrenotato}
                />

            </Container>
        </Box>
    );
}


/*
return(
    <>
        <section className="main__postazioni" id="postazioni">
            <h1 className="main__postazioni__title">Postazioni di Studio</h1>
            <p className="main__postazioni__subtitle">Seleziona aula, data e orario — poi clicca sulla postazione</p>
            <div className="prenotazione__postazione">
                <label htmlFor="date__postazione">Seleziona Data: </label><br /><span><input type="date" id="date__postazione" className="prenotazione__postazione__date" required/></span>
                <label htmlFor="ora__postazione">Ora di inizio</label><br /><span><input type="time" id="ora__postazione" className="prenotazione__postazione__ora" min="08:00" max="21:30" required/></span>
            </div>

            <div className="prenotazione__aula">
                <div className="aula__button">
                    <input type="radio" value ="aulaA" id="aulaA" name="aule" defaultChecked/> <label htmlFor="aulaA">Aula A</label>
                    <input type="radio" value ="aulaB" id="aulaB" name="aule"/> <label htmlFor="aulaB">Aula B</label>            
                </div>
            </div>

            <div className="info__prenotazione__aula">
                <p className="postazioni_libere">(js) Libere</p> 
                <p className="postazioni_occupate">(js) Occupate</p> 
                <p className="postazioni_totali">(js) Totali</p>
            </div>
        </section>
    </>
);
}
*/

export default Postazioni;