const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set("strictQuery", false); // Suppress strictQuery deprecation warning
const userSchema = new Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String},
    createOn: {type: Date, default: new Date().getTime()}
});

module.exports = mongoose.model('Users', userSchema);