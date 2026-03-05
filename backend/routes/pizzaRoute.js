import express from "express";
import { createPizza } from "../controllers/pizzaController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createPizza);

export default router;