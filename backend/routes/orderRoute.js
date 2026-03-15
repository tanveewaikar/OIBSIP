import express from "express"
import Order from "../models/Order.js"
import Pizza from "../models/Pizza.js"
import Ingredient from "../models/Ingredients.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
import sendEmail from "../utils/sendEmail.js"

const router = express.Router()

// PLACE ORDER
router.post("/place-order", authMiddleware, async (req,res)=>{

try{

    const {pizzaId} = req.body

    const pizza = await Pizza.findById(pizzaId)

    if(!pizza){
        return res.status(404).json({message : "Pizza not found"});
    }

    let totalPrice = 0

    // BASE
    const base = await Ingredient.findById(pizza.base)
    totalPrice += base.price

    const updatedBase = await Ingredient.findByIdAndUpdate(
        pizza.base,
        {$inc:{stock:-1}},
        {new:true}
    )

    if(updatedBase.stock < 20){
        await sendEmail(
            process.env.ADMIN_EMAIL,
            "Low Stock Alert",
            `<h3>${updatedBase.name} stock is running low</h3>
            <p>Remaining stock: ${updatedBase.stock}</p>`
        )
    }

    // SAUCE
    const sauce = await Ingredient.findById(pizza.sauce)
    totalPrice += sauce.price

    const updatedSauce = await Ingredient.findByIdAndUpdate(
        pizza.sauce,
        {$inc:{stock:-1}},
        {new:true}
    )

    if(updatedSauce.stock < 20){
        await sendEmail(
            process.env.ADMIN_EMAIL,
            "Low Stock Alert",
            `<h3>${updatedSauce.name} stock is running low</h3>
            <p>Remaining stock: ${updatedSauce.stock}</p>`
        )
    }

    // CHEESE
    const cheese = await Ingredient.findById(pizza.cheese)
    totalPrice += cheese.price

    const updatedCheese = await Ingredient.findByIdAndUpdate(
        pizza.cheese,
        {$inc:{stock:-1}},
        {new:true}
    )

    if(updatedCheese.stock < 20){
        await sendEmail(
            process.env.ADMIN_EMAIL,
            "Low Stock Alert",
            `<h3>${updatedCheese.name} stock is running low</h3>
            <p>Remaining stock: ${updatedCheese.stock}</p>`
        )
    }

    // VEGGIES
    const veggies = await Ingredient.find({_id: {$in: pizza.veggies}})

    for(const v of veggies){

        totalPrice += v.price

        const updatedVeggie = await Ingredient.findByIdAndUpdate(
            v._id,
            {$inc:{stock:-1}},
            {new:true}
        )

        if(updatedVeggie.stock < 20){
            await sendEmail(
                process.env.ADMIN_EMAIL,
                "Low Stock Alert",
                `<h3>${updatedVeggie.name} stock is running low</h3>
                <p>Remaining stock: ${updatedVeggie.stock}</p>`
            )
        }

    }

    // MEAT
    const meat = await Ingredient.find({_id: {$in: pizza.meat}})

    for(const m of meat){

        totalPrice += m.price

        const updatedMeat = await Ingredient.findByIdAndUpdate(
            m._id,
            {$inc:{stock:-1}},
            {new:true}
        )

        if(updatedMeat.stock < 20){
            await sendEmail(
                process.env.ADMIN_EMAIL,
                "Low Stock Alert",
                `<h3>${updatedMeat.name} stock is running low</h3>
                <p>Remaining stock: ${updatedMeat.stock}</p>`
            )
        }

    }

    // CREATE ORDER
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


// UPDATE ORDER STATUS (ADMIN)

router.put("/update-status/:orderId", authMiddleware, adminMiddleware, async (req,res)=>{

try{

    const {orderStatus} = req.body

    const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        {orderStatus},
        {new:true}
    )

    if(!order){
        return res.status(404).json({message:"Order not found"})
    }

    res.json({
        message:"Order status updated successfully",
        order
    })

}
catch(error){
    res.status(500).json({message:error.message})
}

})


// GET MY ORDERS

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

// GET ALL ORDERS (ADMIN)

router.get("/admin-orders", authMiddleware, adminMiddleware, async (req,res)=>{

try{

   const orders = await Order.find()
   .populate("user","name email")
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

// CREATE PAYMENT

router.post("/create-payment/:orderId", authMiddleware, async (req,res)=>{

 try{

   const order = await Order.findById(req.params.orderId)

   if(!order){
      return res.status(404).json({message:"Order not found"})
   }

   const options = {
     amount: order.totalPrice * 100,
     currency: "INR",
     receipt: order._id.toString()
   }

   res.json({
      message:"Razorpay order created",
      amount: options.amount
   })

 }catch(error){
   res.status(500).json({message:error.message})
 }

})


// VERIFY PAYMENT

router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "Paid";

    await order.save();

    res.json({
      success: true,
      message: "Payment successful",
      order,
    });

  } catch (error) {
    console.log("VERIFY PAYMENT ERROR:", error); // important for debugging
    res.status(500).json({ message: error.message });
  }
});

export default router