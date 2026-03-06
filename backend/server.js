import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import pizzaRoute from "./routes/pizzaRoute.js";
import ingredientRoute from "./routes/ingredientRoute.js"
import orderRoute from "./routes/orderRoute.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pizza", pizzaRoute);
app.use("/api/ingredients", ingredientRoute);
app.use("/api/orders",orderRoute);

console.log("ENV TEST:", process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected successfully"))
.catch((err) => console.log("MongoDB connection Error", err));

// test route
app.get("/", (req, res) => {
    console.log("Root route was hit");
    res.send("pizza backend running");
});

// protected route
app.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You accessed a protected route.",
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});