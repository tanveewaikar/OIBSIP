import Pizza from "../models/Pizza";
import Ingredients from "../models/Ingredients"
import { create } from "domain";

export const createPizza = async (req, res) =>{
    try{
        //fetch require Ingredients

        const {base,sauce,cheese,veggies,meats} = req.body;
        const baseItem = await Ingredients.findById(base);
        const sauceItem = await Ingredients.findById(sauce);
        const cheeseItem = await Ingredients.findById(cheese);
        
        if(!baseItem || !sauceItem || !cheeseItem){
            res.status(400).json({message: "Invalid base , sauce or cheese"})
        }
        let totalPrice = baseItem.price + sauceItem.price + cheeseItem.price;
        
        //fetch veggie if exist
        if(veggies && veggies.length > 0){
            const veggieItem = await Ingredients.findById({_id: {$in : veggies}});
            veggieItem.forEach(item =>{
                totalPrice += item.price;
            });
        }
        
        //fetch meat if exist
        if(meats && meats.length >0){
            const meatItem = await Ingredients.find({_id:{$in: meats}});
            meatItem.forEach(item => {
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
            createdBy : req.user.id
        });
        
        res.status(201).json(pizza); // send saved pizza to frontend 
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
};