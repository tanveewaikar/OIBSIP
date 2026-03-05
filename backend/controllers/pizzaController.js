import Pizza from "../models/Pizza.js";
import Ingredient from "../models/Ingredient.js";

export const createPizza = async (req, res) => {
  try {
    const { base, sauce, cheese, veggies, meats } = req.body;

    // Fetch required ingredients
    const baseItem = await Ingredient.findById(base);
    const sauceItem = await Ingredient.findById(sauce);
    const cheeseItem = await Ingredient.findById(cheese);

    if (!baseItem || !sauceItem || !cheeseItem) {
      return res.status(400).json({ message: "Invalid base, sauce, or cheese" });
    }

    let totalPrice =
      baseItem.price + sauceItem.price + cheeseItem.price;

    // Fetch veggies if exist
    if (veggies && veggies.length > 0) {
      const veggieItems = await Ingredient.find({ _id: { $in: veggies } });
      veggieItems.forEach(item => {
        totalPrice += item.price;
      });
    }

    // Fetch meats if exist
    if (meats && meats.length > 0) {
      const meatItems = await Ingredient.find({ _id: { $in: meats } });
      meatItems.forEach(item => {
        totalPrice += item.price;
      });
    }

    const pizza = await Pizza.create({
      base,
      sauce,
      cheese,
      veggies,
      meats,
      totalPrice,
      createdBy: req.user.id   // assuming JWT middleware sets req.user
    });

    res.status(201).json(pizza);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};