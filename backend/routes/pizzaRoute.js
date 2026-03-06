import express from "express";
import Pizza from "../models/Pizza.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE PIZZA
router.post("/create", authMiddleware, async (req, res) => {
  try {

    const { base, sauce, cheese, veggies, meat } = req.body;

    const pizza = new Pizza({
      base,
      sauce,
      cheese,
      veggies,
      meat,
      createdBy: req.user.id
    });

    const savedPizza = await pizza.save();

    res.status(201).json(savedPizza);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET USER PIZZAS
router.get("/my-pizzas", authMiddleware, async (req, res) => {
  try {

    const pizzas = await Pizza.find({ createdBy: req.user.id })
      .populate("base")
      .populate("sauce")
      .populate("cheese")
      .populate("veggies")
      .populate("meat");

    res.json(pizzas);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;