import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    pizza:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza",
        required: true
    },

    totalPrice:{
        type:Number,
        required:true
    },

    orderStatus:{
        type:String,
        enum:["Order Received","In Kitchen","Sent to Delivery"],
        default:"Order Received"
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid"],
        default:"Pending"
    }

},{timestamps:true})

export default mongoose.model("Order",orderSchema)