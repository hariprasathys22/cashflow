const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true}
});
const UserModal = mongoose.model("User", UserSchema)

module.exports = UserModal;
