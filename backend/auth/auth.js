const express = require('express');
const db = require('../db/connection')
const bcrypt = require('bcryptjs');
const users = db.get('users');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "helo authjs"
    });
});

router.post('/login', async(req,res,next) => {
    const login = {
        username: req.body.username,
        password: req.body.password
    }
    try{
        const coba = await users.findOne({ username: login.username});
        if(!coba){
            const error = new Error("Username tidak ada");
            res.status(404);
            next(error);
        }
        else
        {
         bcrypt.compare(login.password,coba.password,(err,success) => {
            if (err){
                const error = new Error ("Bcrypt gagal "+ err);
                next(error);
            }
            else
            {
                if (success){
                    const payload = {
                        _id: coba._id,
                        username: coba.username,
                        nama: coba.nama,
                    };
                    jwt.sign(payload,process.env.TOKEN_SECRET,{
                        expiresIn:'1d'
                    },(err,token)=>{
                        if (err){
                            const error = new Error ("Create token error"+err);
                        }
                        else{
                            res.json({
                                token : token
                            });
                        }
                    })
                   
                }
                else{
                    const error = new Error ("Password salah");
                    res.status(417);
                    next(error);
                }
               
            }
         })
        }
    }catch(e){
        const error = new Error("Kesalahan Database" + e);
        next(error);
    }
})

router.post('/register', async (req, res, next) => {
    const user = {
        username: req.body.username,
        nama: req.body.nama,
        password: req.body.password
    }
    try {
        const userHasil = await users.findOne({ username: user.username });
        if (userHasil) {
            const error = new Error("Username ada");
            res.status(409);
            next(error);
        }
        else {
            bcrypt.hash(user.password,12,(err,hash)=>{
                if (err){
                    const error = new Error ("Bcrypt gagal "+ err);
                    next(error);
                }
                else{
                    const siapPakai ={...user,password:hash}
                    try{
                        users.insert(siapPakai);
                        res.json({
                            message:"User berhasil dibuat"
                        });
                    }
                    catch (e){
                        const error = new Error("Insert Error"+e);
                        next(error);
                    }
                }
            })
        }   
    }
    catch (e) {
        const error = new Error("Kesalahan Database" + e);
        next(error);
    }
});
module.exports = router;