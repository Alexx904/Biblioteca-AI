import Libro from "../models/Libro.js";
import Utente from "../models/Utente.js";
// Ottenere tutti i libri 
async function getAllBooks(req,res){
    try {
        const libri = await Libro.find();
        res.json(libri);
    } catch (err) {
        res.status(500).json({ messaggio: "Errore nel caricamento libri" });
    }
};

// Prenotare un libro (usa verificaToken)
async function reserveBook (req,res){
    try {
        const libro = await Libro.findById(req.params.id);
        
        if (!libro) return res.status(404).json({ messaggio: "Libro non trovato" });
        if (libro.copieDisponibili <= 0) return res.status(400).json({ messaggio: "Nessuna copia disponibile" });

        // Decrementa le copie
        libro.copieDisponibili -= 1;
        await libro.save();

        //salvataggio prenotazione
        const utente = await Utente.findById(req.utente.id);
        if(!utente.libriPrenotati.map(id => id.toString()).includes(libro._id.toString())){
            utente.libriPrenotati.push(libro._id);
            await utente.save();
        }

        res.json({ messaggio: "Libro prenotato con successo!", libro });
    } catch (err) {
        res.status(500).json({ messaggio: "Errore durante la prenotazione del libro" });
    }
};

async function returnBook(req,res){
    try {
        const utente = await Utente.findById(req.utente.id);
        const libro = await Libro.findById(req.params.id);

        if (!libro) return res.status(404).json({ messaggio: "Libro non trovato" });

        // Rimuove l'ID del libro dall'array dell'utente
        utente.libriPrenotati = utente.libriPrenotati.filter(idLibro => idLibro.toString() !== libro._id.toString());
        await utente.save();

        // Incrementa di nuovo le copie disponibili
        libro.copieDisponibili += 1;
        await libro.save();

        res.json({ messaggio: "Libro restituito con successo!" });
    } catch (err) {
        res.status(500).json({ messaggio: "Errore durante la restituzione" });
    }
}

//creazione libri da admin
async function createBook(req,res){
    try{
        const utente = await Utente.findById(req.utente.id);
        if(utente.ruolo !== "admin"){
            return res.status(403).json({messaggio:"Accesso negato"});
        }

        const nuovoLibro = new Libro(req.body);
        
        // CORRETTO: nuovoLibro invece di newLibro
        await nuovoLibro.save(); 
        
        res.status(201).json({messaggio: "Libro aggiunto", libro: nuovoLibro });
    }catch(err){
        res.status(500).json({messaggio: "Errore inserimento libro", err});
    }
}

export default {getAllBooks, reserveBook, returnBook, createBook}