import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//caricamento delle variabili d'ambiente
dotenv.config();

const app = express(); //inizializzazione app

app.use(express.json()); //ricezione di json da parte del server

app.use(cors()); //comunicazione col server

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connesso a MongoDB"))
    .catch((err) => console.error(" Errore di connessione a MongoDB:", err));

//utente di mongo
const utenteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    matricola: { type: String, required: true },
    facolta: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique: true impedisce doppie registrazioni!
    password: { type: String, required: true }
});

const Utente = mongoose.model("Utente", utenteSchema);

// porta per ricevere dati
app.post("/api/registrazione", async (req,res) => {
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

app.post("/api/login", async (req, res) => {
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
                email: utenteTrovato.email
            }
        });

    } catch (errore) {
        console.error(errore);
        res.status(500).json({ messaggio: "Errore del server durante il login" });
    }

});

export function verificaToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //formato Bearer

    if(!token){
        return res.status(401).json({messaggio: "Manca token"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.utente = decoded;
        next();
    }catch(err){
        return res.status(403).json({messaggio: "Token scaduto o non valido"});
    }
};

app.get("/api/io", verificaToken, (req,res)=>{
    res.json({messaggio: "Accesso autorizzato", utente: req.utente});
});


// avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta http://localhost:${PORT}`);
});