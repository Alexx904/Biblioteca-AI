import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express(); //inizializzazione app

app.use(express.json()); //ricezione di json da parte del server

app.use(cors()); //comunicazione col server


// collegamento a mongo via url
const uri = "mongodb+srv://uomodaffari8_db_user:progettoweb@biblioteca.dr76c86.mongodb.net/?appName=Biblioteca";

mongoose.connect(uri)
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
        const utenteEsistente = await Utente.findOne({email: req.body.email});
        if(utenteEsistente){
            return res.status(400).json({messaggio: "Questa email è gia registrata"});
        }else{
            const nuovoUtente = new Utente(req.body);

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

        console.log("Dati ricevuti:", { email, password });

        const utenteTrovato = await Utente.findOne({ email: email });

        if (!utenteTrovato) {
            return res.status(404).json({ messaggio: "Utente non trovato. Devi prima registrarti" });
        }

        if (utenteTrovato.password !== password) {
            return res.status(401).json({ messaggio: "Password errata!" });
        }

        res.status(200).json({
            messaggio: "Login effettuato con successo!",
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


// avvio server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta http://localhost:${PORT}`);
});