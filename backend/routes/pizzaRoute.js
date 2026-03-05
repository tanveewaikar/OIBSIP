import express from "express";
import createPizza from "../controllers/pizzaController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createPizza);
export default router;