const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    pass: String
});

module.exports = mongoose.model("User",{userSchema});