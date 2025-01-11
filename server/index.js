require('dotenv').config();

const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const authRoute = require('./routes/auth.route');
const noteRoute = require('./routes/note.route');

mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors({ origin: "*" }));

// Define a route
app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

app.use('/api', authRoute);
app.use('/api', noteRoute);

// Start the server
const PORT = 8040;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
