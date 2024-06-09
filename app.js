// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemsRoutes");
const authRoutes = require("./routes/authRoutes");
const helmet = require("helmet");
const logger = require("./middleware/logger");
require("dotenv").config();

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(logger);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

// Routes

app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("inside error middleware");
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
