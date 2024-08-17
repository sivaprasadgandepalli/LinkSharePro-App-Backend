const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
    platformName: { type: String, required: true },
    Url: { type: String, required: true },
    timestamps: { type: Date, default: Date.now }
});
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    profileImage: {
        type: String
    },
    links:{
        type:[linkSchema],
        default:[]
    }

}, { timestamps: true });

module.exports = mongoose.model("newUser", userSchema);