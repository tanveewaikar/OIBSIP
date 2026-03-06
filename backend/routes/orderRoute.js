import express from "express"
import Order from "../models/Order.js"
import Pizza from "../models/Pizza.js"
import Ingredient from "../models/Ingredients.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// Place Order
router.post("/place-order", authMiddleware, async (req,res)=>{

try{

    const {pizzaId} = req.body

    const pizza = await Pizza.findById(pizzaId)

    if(!pizza){
        return res.status(404).json({message:"Pizza not found"})
    }

    let totalPrice = 0

    // Base price
    const base = await Ingredient.findById(pizza.base)
    totalPrice += base.price

    // Sauce price
    const sauce = await Ingredient.findById(pizza.sauce)
    totalPrice += sauce.price

    // Cheese price
    const cheese = await Ingredient.findById(pizza.cheese)
    totalPrice += cheese.price

    // Veggies price
    const veggies = await Ingredient.find({_id: {$in: pizza.veggies}})
    veggies.forEach(v => {
        totalPrice += v.price
    })

    // Meat price
    const meat = await Ingredient.find({_id: {$in: pizza.meat}})
    meat.forEach(m => {
        totalPrice += m.price
    })

    // Create order
    const order = new Order({
        user:req.user.id,
        pizza:pizzaId,
        totalPrice
    })

    await order.save()

    res.status(201).json({
        message:"Order placed successfully",
        totalPrice,
        order
    })

}
catch(error){
    res.status(500).json({message:error.message})
}

})

export default router