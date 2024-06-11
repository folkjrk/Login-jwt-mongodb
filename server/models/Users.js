const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    password:{
        type: String,
        required: true,
        min: 5,
    }
});

module.exports = mongoose.model("User", UserSchema);
