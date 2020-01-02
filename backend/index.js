const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');
const auth = require('./auth/auth');
const app = express();
const perhitungan = require('./perhitungan/perhitungan');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(volleyball);
app.use('/auth',auth);
app.use('/hitung',perhitungan);
//localhost:5000/hitung/perhitungan
//{a:3,b:5}
app.get('/',(req,res)=>{
    res.json({
        "Message":"Hello Adam~!"
    });
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Listening On Port "+port);
});

function notFound (req,res,next){
    res.status(404);
    const error = new Error("Not Found "+req.originalUrl);
    next(error);
}

function errorHandler(err,req,res,next){
    res.status(res.statusCode||500);
    res.json({
        message:err.message})
}
app.use(notFound);
app.use(errorHandler);

