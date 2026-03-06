import express from "express"
import Order from "../models/Order.js"
import Pizza from "../models/Pizza.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// Place Order
router.post("/place-order", authMiddleware, async (req,res)=>{

    try{

        const {pizzaId} = req.body

        // find pizza
        const pizza = await Pizza.findById(pizzaId)

        if(!pizza){
            return res.status(404).json({message:"Pizza not found"})
        }

        // create order
        const order = new Order({
            user:req.user.id,
            pizza:pizzaId,
            totalPrice:pizza.totalPrice
        })

        await order.save()

        res.status(201).json({
            message:"Order placed successfully",
            order
        })

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

})

export default router