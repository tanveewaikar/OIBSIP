import express from "express"
import Order from "../models/Order.js"
import Pizza from "../models/Pizza.js"
import Ingredient from "../models/Ingredients.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
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
    await Ingredient.findByIdAndUpdate(pizza.base,{$inc :{stock:-1}});

    // Sauce price
    const sauce = await Ingredient.findById(pizza.sauce)
    totalPrice += sauce.price
    await Ingredient.findByIdAndUpdate(pizza.sauce,{$inc :{stock:-1}});

    // Cheese price
    const cheese = await Ingredient.findById(pizza.cheese)
    totalPrice += cheese.price
    await Ingredient.findByIdAndUpdate(pizza.cheese,{$inc :{sock:-1}});

    // Veggies price
    const veggies = await Ingredient.find({_id: {$in: pizza.veggies}})
    for(const v of veggies){
        totalPrice += v.price
        await Ingredient.findByIdAndUpdate(v._id,{$inc:{stock:-1}});
    }

    // Meat price
    const meat = await Ingredient.find({_id: {$in: pizza.meat}})
    for(const m of meat){
        totalPrice += m.price
        await Ingredient.findByIdAndUpdate(m._id,{$inc:{stock:-1}});
    }    

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

//status update route 

router.put("/update-status/:orderId", authMiddleware,adminMiddleware, async (req, res)=>{
    try{
        const {orderStatus}= req.body;
        
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            {orderStatus},
            {new:true}
        )
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.json({message :"Order status updated successfully", order});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

// Get My Orders

router.get("/my-orders", authMiddleware, async (req,res)=>{

try{

   const orders = await Order.find({ user:req.user.id })
   .populate({
      path:"pizza",
      populate:[
        {path:"base"},
        {path:"sauce"},
        {path:"cheese"},
        {path:"veggies"},
        {path:"meat"}
      ]
   })

   res.json(orders)

}
catch(error){
   res.status(500).json({message:error.message})
}

})
export default router