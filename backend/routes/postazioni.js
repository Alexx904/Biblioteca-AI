import express from "express";
import postazioniController from "../controllers/postazioniController.js";
import { verificaToken } from "../middleware/auth.js";

const router = express.Router();

// Ottenere i posti di un'aula 
router.get("/:aula", postazioniController.getSeatsByRoom);

// Prenotare un posto
router.post("/:id_posto/prenota", verificaToken, postazioniController.reserveSeat);

//disdire prenotazione
router.post("/:id_posto/disdici", verificaToken, postazioniController.cancelSeatReservation);

//creazione postazioni da admin
router.post("/", verificaToken, postazioniController.createSeat);

export default router;