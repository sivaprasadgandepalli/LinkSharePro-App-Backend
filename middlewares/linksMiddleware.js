const userModel = require("../models/user");

async function verifyUser(req, res, next) {
    const { id } = req.body;
    const user = userModel.findOne({ _id: id });
    if (!user) {
        return res.status(404).json("User not found.")
    }
    next();
}

module.exports = {
    verifyUser
}