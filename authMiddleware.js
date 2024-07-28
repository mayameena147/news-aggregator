// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require("./database/userModel");

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.user = await User.findOne({name: decoded.name});
        console.log(decoded);
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
