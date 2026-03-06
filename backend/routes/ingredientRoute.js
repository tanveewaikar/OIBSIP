import express from "express";
import Ingredient from "../models/Ingredients.js";

const router = express.Router();

router.get("/", async (req,res)=>{
    try{
        const bases = await Ingredient.find({type:"base"});
        const sauces = await Ingredient.find({type:"sauce"});
        const cheese = await Ingredient.find({type:"cheese"});
        const veggies = await Ingredient.find({type:"veggie"});
        const meat = await Ingredient.find({tyope:"meat"});

        res.json({
            bases,
            sauces,
            cheese,
            veggies,
            meat
        });
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})

export default router;