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
  meat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient"
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{ timestamps: true }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;