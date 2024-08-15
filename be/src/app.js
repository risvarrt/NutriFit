const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use("/api/products", require("./routes/ProductsRoute"));
app.use("/api/checkout", require("./routes/CheckoutRoute"));
app.use("/api/blog", require("./routes/BlogRoute"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/workout-programs", require("./routes/WorkoutProgramRoutes"));
app.use("/api/auth", require("./routes/AuthRoute"));
app.use("/api/metrics", require("./routes/MetricsRoute"));
app.use("/api/metrics/:id", require("./routes/MetricsRoute"));
app.use("/api/recipes", require("./routes/RecipeRoute"));
app.use("/api/weight", require("./routes/WeightRoute"));
app.use("/api/calories", require("./routes/CalorieRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
