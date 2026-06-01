import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Utente from "../models/Utente.js";
import {verificaToken} from "../middleware/auth.js";

const router = express.Router();

// REGISTRAZIONE
router.post("/registrazione", async (req, res) => {
    try{
        const {nome, matricola, facolta, email, password} = req.body;

        const utenteEsistente = await Utente.findOne({email: req.body.email});
        if(utenteEsistente){
            return res.status(400).json({messaggio: "Questa email è gia registrata"});
        }else{

            const passwordHashata = await bcrypt.hash(password, 10);

            const nuovoUtente = new Utente({
                nome, matricola, facolta, email,
                password: passwordHashata
            });

            await nuovoUtente.save();

            res.status(200).json({messaggio: "Registrazione avvenuta"});
        }

        
    }catch(err){
        console.log(err);
        res.status(500).json({messaggio: "Errore del server durante la registrazione "});
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const utenteTrovato = await Utente.findOne({ email: email });

        if (!utenteTrovato) {
            return res.status(404).json({ messaggio: "Utente non trovato. Devi prima registrarti" });
        }

        const passwordCorretta = await bcrypt.compare(password, utenteTrovato.password);

        if (!passwordCorretta) {
            return res.status(401).json({ messaggio: "Password errata!" });
        }

        const token = jwt.sign(
            {
                id: utenteTrovato._id, email: utenteTrovato.email
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(200).json({
            messaggio: "Login effettuato con successo!",
            token,
            utente: {
                nome: utenteTrovato.nome,
                email: utenteTrovato.email,
                ruolo: utenteTrovato.ruolo
            }
        });

    } catch (errore) {
        console.error(errore);
        res.status(500).json({ messaggio: "Errore del server durante il login" });
    }
});

router.get("/profilo", verificaToken, async (req,res)=>{
    
    try {
        const utente = await Utente.findById(req.utente.id)
            .select("-password") // Non mandiamo la password al frontend
            .populate("libriPrenotati")
            .populate("postazioniPrenotate");
            
        if(!utente) return res.status(404).json({ messaggio: "Utente non trovato" });
        
        res.json(utente);
    } catch (err) {
        res.status(500).json({ messaggio: "Errore nel caricamento profilo" });
    }
});

export default router;