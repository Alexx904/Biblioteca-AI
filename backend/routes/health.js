// Importa la libreria Express per creare il router
import express from 'express'

// Importa HealthController del server
import HealthController from '../controllers/healthController'

// Crea un nuovo router Express per definire le rotte
const router = express.Router()

// Route GET al percorso radice (/)
// Chiama il metodo healthCheck del controller per verificare che il server sia in salute
router.get('/', HealthController.healthCheck)

// Esporta il router per essere utilizzato nell'applicazione principale
export default router