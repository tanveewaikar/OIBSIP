import express from "express";
import Ingredient from "../models/Ingredients.js";

const router = express.Router();

router.get("/", async (req,res)=>{
    try{
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})

export default router;