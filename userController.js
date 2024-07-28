const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./database/userModel");

async function registerUser(req, res) {

    const { name, email, password, preferences } = req.body;
    if(email === undefined || name === undefined || password === undefined){
        return res.status(400).json({ message: 'Provide all information' });
    }
    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, preferences: preferences });
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function loginUser(req, res) {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getUserPreferences(req, res){
    try {
        const user = req.body.user;
        res.json({preferences: user.preferences});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateUserPreferences(req, res){
    const { preferences, user } = req.body;

    try {
        user.preferences = preferences;
        await user.save();
        res.status(200).json(user.preferences);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
}

module.exports = {registerUser, loginUser, getUserPreferences, updateUserPreferences};