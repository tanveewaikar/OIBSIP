import express from "express";
import Ingredient from "../models/Ingredients.js";

const router = express.Router();


// GET ingredients
router.get("/", async (req,res)=>{
    try{
        const bases = await Ingredient.find({type:"base"});
        const sauces = await Ingredient.find({type:"sauce"});
        const cheese = await Ingredient.find({type:"cheese"});
        const veggies = await Ingredient.find({type:"veggie"});
        const meat = await Ingredient.find({type:"meat"}); // fixed typo

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
});


// ADD ingredient
router.post("/", async (req,res)=>{
    try{

        const ingredient = new Ingredient(req.body);

        await ingredient.save();

        res.status(201).json(ingredient);

    }
    catch(error){
        res.status(500).json({message : error.message});
    }
});


export default router;   