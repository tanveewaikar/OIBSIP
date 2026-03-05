import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["base","sauce","cheese","veggie","meat"],
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true
  }
},
{ timestamps: true }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;