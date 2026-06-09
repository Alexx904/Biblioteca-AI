/**
 * apiFetch — wrapper attorno a fetch con:
 *  - credentials: "include"  →  invia i cookie httpOnly automaticamente
 *  - refresh automatico      →  se riceve 401, chiama /api/auth/refresh
 *                               e riprova la richiesta originale
 *  - evento sessioneScaduta  →  se anche il refresh fallisce, avvisa l'app
 */

/*Descrive le tre funzionalità principali:

invia automaticamente i cookie
rinnova automaticamente l'access token quando scade
avvisa l'app quando anche il refresh token non è più valido

*/

// Dopo:
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; //url backend

async function apiFetch(percorso, opzioni = {}) { //serve per evitare di scrivere ogni volta l'indirizzo completo
    //percorso -> endpoint da chiamare, opzioni-> configurazione della fetch
    const opzioniComplete = {
        ...opzioni, //spread operator che copia tutte le opzioni passate dell'utente
        credentials: "include",   // Invia cookie accessToken + refreshToken
        headers: {
            "Content-Type": "application/json",
            ...opzioni.headers
        }
    };

    let risposta = await fetch(BASE_URL + percorso, opzioniComplete);

    // Access token scaduto -> tenta il refresh
    if (risposta.status === 401) {
        const refreshRisposta = await fetch(BASE_URL + "/api/auth/refresh", {
            method: "POST",
            credentials: "include" //Dice al browser di inviare automaticamente i cookie.
        });

        if (refreshRisposta.ok) {
            // Nuovo access token ricevuto nel cookie: riprova la richiesta originale
            risposta = await fetch(BASE_URL + percorso, opzioniComplete);
        } else {
            // Refresh token scaduto o revocato → sessione terminata
            window.dispatchEvent(new Event("sessioneScaduta"));
        }
    }

    return risposta;
}

export default apiFetch;