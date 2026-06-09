import express from "express";
import authController from "../controllers/authController.js";
import {verificaToken} from "../middleware/auth.js";

const router = express.Router();

router.post("/registrazione", authController.registrazione);
router.post("/login", authController.login);
router.get("/profilo", verificaToken, authController.getProfile);

router.post("/refresh", authController.refreshToken); 
router.post("/logout", authController.logout);        // Per il tasto logout nella NavBar
router.put("/me/aggiorna", verificaToken, authController.updateProfile); // Per le Impostazioni
router.put("/me/password", verificaToken, authController.updatePassword); // Per le Impostazioni

export default router;