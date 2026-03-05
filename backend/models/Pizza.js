import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
{
  base: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true
  },
  sauce: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true
  },
  cheese: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true
  },
  veggies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient"
    }
  ],
  meats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient"
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{ timestamps: true }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;