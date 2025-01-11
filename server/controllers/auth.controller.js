const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = {
    // Register a new user
    login: async (req, res) => {

        const {
            email,
            password
        } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }

        userInfo = await User.findOne({
            email: email
        });

        if (!userInfo) {
            return res.status(400).json({
                message: 'user not found'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, userInfo.password);

        if (userInfo.email === email && isPasswordValid) {
            const user = {
                user: userInfo
            };

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "36000m",
            });

            return res.json({
                error: false,
                message: 'login success',
                email,
                accessToken,
            });
        } else {
            return res.status(400).json({
                error: true,
                message: 'Invalid Credentials',
            });
        }
    },

    register: async (req, res)=>{
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
            // const hashedPassword = password;
    
            // Save user
            const user = new User({
                fullName,
                email,
                password: hashedPassword,
            });
    
            await user.save();
    
            // Generate access token
            // const accessToken = jwt.sign(
            //     { userId: user._id, email: user.email },
            //     process.env.ACCESS_TOKEN_SECRET,
            //     { expiresIn: "30m" }
            // );
    
            const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '36000m',
            });
    
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
    },

    get: async (req, res)=>{
        const {user}= req.user;

        const isUser = await User.findOne({_id:user._id});
    
        if(!isUser){
            return res.sendStatus(401);
        }
    
        return res.json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdOn: isUser.createOn
            },
            message: ''
        });
    }
};