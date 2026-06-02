import express from "express";
import bookController from "../controllers/bookController.js";
import { verificaToken } from "../middleware/auth.js";


const router = express.Router();

// Ottenere tutti i libri 
router.get("/",bookController.getAllBooks)

// Prenotare un libro (usa verificaToken)
router.post("/:id/prenota", verificaToken, bookController.reserveBook);

router.post("/:id/restituisci", verificaToken, bookController.returnBook);

//creazione libri da admin
router.post("/", verificaToken, bookController.createBook);

export default router;