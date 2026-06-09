import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import {parse} from "yaml";
import fs from 'fs';
import path from 'path';

import Libro from "./models/Libro.js";
import Postazione from "./models/Postazione.js";

//caricamento delle variabili d'ambiente
dotenv.config();

//import dei router
import auth from "./routes/auth.js";
import book from "./routes/book.js";
import postazioni from "./routes/postazioni.js";
import health from "./routes/health.js";
import chat from "./routes/chat.js"

const app = express(); //inizializzazione app

app.use(express.json()); //ricezione di json da parte del server
app.use(cookieParser());

// PER VERCEL
const swaggerPath = path.join(process.cwd(), 'swagger.yaml');
const swaggerFile = fs.readFileSync(swaggerPath, 'utf8');

// Swagger UI
const swaggerDocument = parse(readFileSync("./swagger.yaml", "utf8"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({ //premette comunicazione
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // L'URL esatto del tuo frontend React
    credentials: true                // FONDAMENTALE: permette l'uso dei cookie
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connesso a MongoDB"))
    .catch((err) => console.error(" Errore di connessione a MongoDB:", err));

//ROUTES
app.use("/api/auth", auth);            
app.use("/api/libri", book);           
app.use("/api/postazioni", postazioni);
app.use("/api/health", health);
app.use("/api/chat", chat);

const httpServer = http.createServer(app);

app.get("/api/stats", async (req, res) => {
    try {
        // Conta quanti libri e quante postazioni totali esistono nel DB
        const totalLibri = await Libro.countDocuments();
        const totalPostazioni = await Postazione.countDocuments();

        res.json({
            libri: totalLibri,
            postazioni: totalPostazioni,
            orari: "8:00 - 20:00" // Questo può rimanere fisso o essere reso dinamico in futuro
        });
    } catch (err) {
        res.status(500).json({ messaggio: "Errore nel calcolo delle statistiche", errore: err.message });
    }
});

const io = new Server(httpServer,{
    cors:{
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.set("io",io);

io.on("connection", (socket) => {
    console.log("Client connesso:", socket.id);
 
    // Il client si unisce alla stanza dell'aula che sta guardando
    socket.on("joinAula", (aula) => {
        socket.join(aula);
        console.log(`${socket.id} si è unito a ${aula}`);
    });
 
    socket.on("disconnect", () => {
        console.log("Client disconnesso:", socket.id);
    });
});

// avvio server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta http://localhost:${PORT}`);
});