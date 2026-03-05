import mongoose from "mongoose";
import Ingredient from "../models/Ingredients.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    const ingredients = [

        { name: "Thin Crust", type: "base", stock: 50, price: 120 },
        { name: "Cheese Burst", type: "base", stock: 40, price: 150 },
        { name: "Classic Pan", type: "base", stock: 45, price: 130 },

        { name: "Tomato Sauce", type: "sauce", stock: 100, price: 20 },
        { name: "Barbecue Sauce", type: "sauce", stock: 80, price: 25 },
        { name: "Pesto Sauce", type: "sauce", stock: 60, price: 30 },

        { name: "Mozzarella", type: "cheese", stock: 90, price: 40 },
        { name: "Cheddar", type: "cheese", stock: 70, price: 35 },

        { name: "Onion", type: "veggie", stock: 100, price: 15 },
        { name: "Capsicum", type: "veggie", stock: 100, price: 15 },
        { name: "Mushroom", type: "veggie", stock: 80, price: 20 },

        { name: "Chicken", type: "meat", stock: 60, price: 50 },
        { name: "Pepperoni", type: "meat", stock: 50, price: 55 }

    ];

    await Ingredient.deleteMany();
    await Ingredient.insertMany(ingredients);

    console.log("Ingredients Seeded Successfully");
    process.exit();

})
.catch(err => console.log(err));