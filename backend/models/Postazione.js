import mongoose from "mongoose";

const prenotazioneSchema = new mongoose.Schema({
    utenteId: { type: mongoose.Schema.Types.ObjectId, ref:"Utente", required: true},
    data: {type: "String", required: true},
    ora: { type: "String", required: true},
    durata: { type: "Number", default: 1}
})
const postazioneSchema = new mongoose.Schema({
    id_posto: { type: String, required: true, unique: true }, // es. "A1", "B12"
    aula: { type: String, required: true },                 // "aulaA" o "aulaB"
    prenotazioni: [prenotazioneSchema]
});

const Postazione = mongoose.model("Postazione", postazioneSchema);
export default Postazione;