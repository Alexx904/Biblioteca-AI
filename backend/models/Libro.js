import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
    titolo: { type: String, required: true },
    autore: { type: String, required: true },
    descrizione: String,
    copieTotali: { type: Number, required: true },
    copieDisponibili: { type: Number, required: true },
    scaffale: String,
    categoria: String,
    colore: String,
    emoji: String
});

const Libro = mongoose.model("Libro", libroSchema);
export default Libro;