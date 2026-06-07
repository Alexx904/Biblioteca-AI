// backend/routes/chat.js

import express from "express";
import { elaboraMessaggio } from "../controllers/chatController.js";

const router = express.Router(); // Inizializziamo il mini-router

// Quando il frontend farà una richiesta POST a questo endpoint,
// Express chiamerà la funzione elaboraMessaggio del nostro controller.
router.post("/", elaboraMessaggio);

export default router;