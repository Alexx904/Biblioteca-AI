import express from "express";
import authController from "../controllers/authController.js";
import {verificaToken} from "../middleware/auth.js";

const router = express.Router();

router.post("/registrazione", authController.registrazione);
router.post("/login", authController.login);
router.get("/profilo", verificaToken, authController.getProfile);

export default router;