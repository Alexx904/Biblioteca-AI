import { GoogleGenerativeAI } from "@google/generative-ai";

// Inizializziamo l'SDK passandogli la chiave segreta in modo sicuro

export const elaboraMessaggio = async (req, res) => {
    try {
        const { messaggioUtente } = req.body;

        if (!messaggioUtente) {
            return res.status(400).json({ error: "Nessun messaggio fornito" });
        }
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // 1. Diciamo all'SDK quale modello vogliamo usare
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite", systemInstruction: "Sei un assistente virtuale per un'applicazione universitaria di prenotazione postazioni e aule studio. Rispondi in italiano in modo educato, professionale e molto conciso. Se uno studente ti fa domande fuori dal contesto universitario, rispondi gentilmente che non sei programmato per rispondere a quell'argomento." });

        // 2.
        // Chiamiamo il metodo 'generateContent'. L'SDK crea la richiesta HTTP complessa,
        // la invia ai server di Google, attende la risposta e ce la formatta.
        // Usiamo 'await' perché ci vorrà qualche secondo per generare la risposta.
        const result = await model.generateContent(messaggioUtente);
        
        // Estraiamo solo il testo pulito dalla risposta complessa dell'AI
        const rispostaAI = result.response.text();

        // 3. 
        res.status(200).json({
            mittente: "ai",
            testo: rispostaAI
        });

    } catch (error) {
        console.error("Errore di comunicazione con l'AI:", error);
        res.status(500).json({ error: "Errore interno durante l'elaborazione dell'AI" });
    }
};