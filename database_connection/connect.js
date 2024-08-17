const mongoose = require("mongoose");
require("dotenv").config();
async function Connection() {
    return await mongoose.connect(process.env.MONGODB_URL);
}

module.exports = { Connection };
