require('dotenv').config();

const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const express = require("express");
const cors = require("cors");

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
app.get("/check-connection", async (req, res) => {
    const dbState = mongoose.connection.readyState; // Returns 0 (disconnected), 1 (connected), 2 (connecting), 3 (disconnecting)
    const stateMessages = ["Disconnected", "Connected", "Connecting", "Disconnecting"];
    res.json({ state: stateMessages[dbState] });
});
// Create User Account
app.post("/create-account", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate input
        if (!fullName) {
            return res.status(400).json({ error: true, message: "Full name is required" });
        }
        if (!email) {
            return res.status(400).json({ error: true, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ error: true, message: "Password is required" });
        }

        // Check if user already exists
        const isUser = await User.findOne({ email: email });
        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Generate access token
        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        );

        return res.status(201).json({
            error: false,
            user: { id: user._id, fullName: user.fullName, email: user.email },
            accessToken,
            message: "Registration successful",
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            error: true,
            message: "An error occurred during registration",
        });
    }
});

// Start the server
const PORT = 8040;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
