/**
 * Funzione di controllo salute del server (Health Check)
 * Verifica che il server sia operativo e in grado di rispondere alle richieste 
 */
function healthCheck(req, res) {
    res.json({ message: 'Server is healthy' })
}

// Esporta la funzione come oggetto con proprietà healthCheck
// Questo permette di accedervi come HealthController.healthCheck nel router
export default { healthCheck }