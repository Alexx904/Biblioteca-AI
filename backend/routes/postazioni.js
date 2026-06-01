import express from "express";
import Postazione from "../models/Postazione.js";
import { verificaToken } from "../middleware/auth.js";
import Utente from "../models/Utente.js";

const router = express.Router();

function isOccupata(postazione, data, ora) {
    if (!data || !ora) return false;
    const oraRichiesta = parseInt(ora.replace(":", ""), 10);
    return postazione.prenotazioni.some(p => {
        if (p.data !== data) return false;
        const oraInizio = parseInt(p.ora.replace(":", ""), 10);
        const oraFine = oraInizio + (p.durata || 1) * 100;

        return oraRichiesta >= oraInizio && oraRichiesta < oraFine;
    });
}

// Ottenere i posti di un'aula 
router.get("/:aula", async (req, res) => {
    try {
        const { data, ora } = req.query;
        const postazioni = await Postazione.find({ aula: req.params.aula });

        const risultato = postazioni.map(p => ({
            _id: p._id,
            id_posto: p.id_posto,
            aula: p.aula,
            stato: isOccupata(p, data, ora) ? "occupata" : "libera"
        }));
        res.json(risultato);
    } catch (err) {
        res.status(500).json({ messaggio: "Errore nel caricamento postazioni" });
    }
});

// Prenotare un posto
router.post("/:id_posto/prenota", verificaToken, async (req, res) => {
    try {
        const { data, ora, durata } = req.body;

        if (!data || !ora) {
            return res.status(400).json({ messaggio: "data e ora sono obbligatori" });
        }
        const postazione = await Postazione.findOne({ id_posto: req.params.id_posto });

        if (!postazione) return res.status(404).json({ messaggio: "Postazione non trovata" });
        if (isOccupata(postazione, data, ora)) {
            return res.status(400).json({ messaggio: "Postazione occupata" });
        }

        postazione.prenotazioni.push({
            utenteId: req.utente.id,
            data,
            ora,
            durata: durata || 1
        });

        await postazione.save();

        //salvataggio nel profilo
        const utente = await Utente.findById(req.utente.id);
        if (!utente.postazioniPrenotate.map(id => id.toString()).includes(postazione._id.toString())) {
            utente.postazioniPrenotate.push(postazione._id);
            await utente.save();
        }

        const io = req.app.get("io");
        if (io) {
            io.to(postazione.aula).emit("postazioneAggiornata", {
                id_posto: postazione.id_posto,
                aula: postazione.aula,
                stato: "occupata"
            });
        }

        res.json({ messaggio: "Postazione prenotata con successo!", postazione });
    } catch (err) {
        res.status(500).json({ messaggio: "Errore durante la prenotazione" });
    }
});

//disdire prenotazione
router.post("/:id_posto/disdici", verificaToken, async (req, res) => {
    try {
        const postazione = await Postazione.findOne({ id_posto: req.params.id_posto });
        if (!postazione) return res.status(404).json({ messaggio: "Postazione non trovata" });
 
        // Rimuove tutte le prenotazioni di questo utente per questo posto
        const lunghezzaPrima = postazione.prenotazioni.length;
        postazione.prenotazioni = postazione.prenotazioni.filter(
            p => p.utenteId.toString() !== req.utente.id.toString()
        );
 
        if (postazione.prenotazioni.length === lunghezzaPrima) {
            return res.status(400).json({ messaggio: "Nessuna prenotazione trovata per questo posto" });
        }
 
        await postazione.save();
 
        // Rimuove dal profilo utente
        const utente = await Utente.findById(req.utente.id);
        utente.postazioniPrenotate = utente.postazioniPrenotate.filter(
            id => id.toString() !== postazione._id.toString()
        );
        await utente.save();
 
        const io = req.app.get("io");
        if (io) {
            io.to(postazione.aula).emit("postazioneAggiornata", {
                id_posto: postazione.id_posto,
                aula: postazione.aula,
                stato: "libera"
            });
        }
 
        res.json({ messaggio: "Prenotazione disdetta con successo!" });
    } catch (err) {
        res.status(500).json({ messaggio: "Errore durante la disdetta" });
    }
});

//creazione postazioni da admin
router.post("/", verificaToken, async (req, res) => {
    try {
        const utente = await Utente.findById(req.utente.id);
        if (utente.ruolo !== 'admin') {
            return res.status(403).json({ messaggio: "Accesso negato: Solo gli admin" });
        }

        const nuovaPostazione = new Postazione({
            id_posto: req.body.id_posto,
            aula: req.body.aula,
            prenotazioni: []
        });

        await nuovaPostazione.save();
        res.status(201).json({ messaggio: "Postazione creata con successo!" });
    } catch (err) {
        // Se si prova a inserire un id_posto che esiste già, MongoDB dà errore
        res.status(500).json({ messaggio: "Errore. Forse questo ID posto esiste già?" });
    }
});

export default router;