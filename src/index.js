const express = require('express');
const path = require('path');
const bcrypt = require ('bcrypt');
const collection = require('./config');


const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//set template engine
app.set('view engine', 'ejs');

//static file
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', (req,res) => {
    res.render("home");
});

app.get('/login', (req,res) => {
    res.render("auth/login");
});


app.get('/register', (req,res) => {
    res.render("auth/register");
});

//Register User
app.post("/register", async (req, res) =>{
    const data = {
    firstname: req.body.first_name,
    lastname: req.body.last_name,
    email: req.body.email,
    phonenumber: req.body.phone_number,
    address: req.body.address,
    country: req.body.country,
    city: req.body.city,
    password: req.body.password
    }

    const existingUser = await collection.findOne({email: data.email});

    if(existingUser) {
        res.send("You already registed with this email use another email.");
    } else {
        //hash the pasword using bcrypt
        const saltRounds = 10; //Number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; //Replace the hash password with original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

//Login User
app.post("/login", async (req, res) =>{
    try{
        const check = await collection.findOne({email: req.body.email});
        if(!check) {
            res.send("Email not found");
        }
        //Compare the hash password from the database with the plain test
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("home");
        } else {
            req.send("Entered Incorrect password");
        }
    }catch{
        res.send("Wrong Details");
    }
});

const PORT = 4000; 
app.listen(PORT, () => {
    console.log(`Server start at http://localhost:${PORT}`);
});