import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Utente from "../models/Utente.js";

async function registrazione(req,res) {
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
}

async function login(req,res){
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

        const accessToken = jwt.sign(
            { id: utenteTrovato._id, email: utenteTrovato.email, ruolo: utenteTrovato.ruolo },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: utenteTrovato._id },
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        // Impostiamo i token nei cookie HTTP-Only
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: false, sameSite: "lax" });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "lax" });

        res.status(200).json({
            messaggio: "Login effettuato con successo!",
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
}

async function getProfile(req,res){
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
}
async function refreshToken(req, res) {
    // Prende il refresh token dai cookie
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ messaggio: "Nessun refresh token" });

    try {
        const decodificato = jwt.verify(token, process.env.JWT_SECRET);
        
        // Genera un nuovo access token
        const nuovoAccessToken = jwt.sign(
            { id: decodificato.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", nuovoAccessToken, { httpOnly: true, secure: false, sameSite: "lax" });
        res.status(200).json({ messaggio: "Token rinnovato" });
    } catch (err) {
        res.status(403).json({ messaggio: "Refresh token non valido o scaduto" });
    }
}

async function logout(req, res) {
    // Cancella i cookie di sessione
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ messaggio: "Logout effettuato con successo" });
}

async function updateProfile(req, res) {
    try {
        const { nome, email, matricola, facolta } = req.body;
        const utenteAggiornato = await Utente.findByIdAndUpdate(
            req.utente.id,
            { nome, email, matricola, facolta },
            { new: true, runValidators: true } // new: true restituisce il doc aggiornato
        ).select("-password");

        if (!utenteAggiornato) return res.status(404).json({ messaggio: "Utente non trovato" });
        res.status(200).json(utenteAggiornato);
    } catch (err) {
        console.error(err);
        res.status(500).json({ messaggio: "Errore durante l'aggiornamento del profilo" });
    }
}

async function updatePassword(req, res) {
    try {
        const { passwordAttuale, nuovaPassword } = req.body;
        const utente = await Utente.findById(req.utente.id);
        
        if (!utente) return res.status(404).json({ messaggio: "Utente non trovato" });

        // Verifica password attuale
        const passwordCorretta = await bcrypt.compare(passwordAttuale, utente.password);
        if (!passwordCorretta) {
            return res.status(400).json({ messaggio: "La password attuale è errata" });
        }

        // Salva la nuova
        utente.password = await bcrypt.hash(nuovaPassword, 10);
        await utente.save();

        res.status(200).json({ messaggio: "Password aggiornata con successo!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ messaggio: "Errore durante il cambio password" });
    }
}


export default { registrazione, login, getProfile, refreshToken, logout, updateProfile, updatePassword };