const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    preferences: { type: [String], default: [] }, // e.g., ['technology', 'sports']
    readArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    favoriteArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});

const User = mongoose.model("users", usersSchema);

module.exports = User;