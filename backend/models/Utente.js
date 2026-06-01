import mongoose from "mongoose";


const utenteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    matricola: { type: String, required: true },
    facolta: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique: true impedisce doppie registrazioni
    password: { type: String, required: true },
    ruolo: { type: String, default: 'studente' }, // Può essere 'studente' o 'admin'
    libriPrenotati: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Libro' }],
    postazioniPrenotate: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Postazione' }]
});

const Utente = mongoose.model("Utente", utenteSchema);

export default Utente;