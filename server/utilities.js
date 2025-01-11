const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    // Get the token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: true, message: "Forbidden: Invalid token" });
        }

        // Attach the user object to the request
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
}
