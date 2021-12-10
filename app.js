const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tersusData', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;
console.log(port);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//DEFINE MONGOOSE SCHEMA 

var contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    problem:String
});

var Contact=mongoose.model('Contact', contactSchema);








//ENDPOINTS

app.get("/",(req,res)=>{
    

    
   
    res.status(200).render('home.pug');
   
});


app.get("/contact",(req,res)=>{
    //console.log(req.body);
    res.status(200).render('contact.pug');
   
});


app.post("/contact",(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("successfully saved")
    })
    
   
});

Contact.find({ name:"Pratyugna Manna"}, (err,data)=>{
    console.log(data)
});





app.listen(port,()=>{
    console.log("listening on port 80");
});





