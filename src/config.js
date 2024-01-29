const mongoose = require("mongoose");
const connect =  mongoose.connect("mongodb://localhost:27017/login_register");

//check database
connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});

//Create a schema
const LoginSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true 
    }
});

//Collection part
const collection = new mongoose.model("login_registers", LoginSchema);
module.exports = collection;