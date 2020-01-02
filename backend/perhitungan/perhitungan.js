const express = require('express');
const router = express.Router();

function spk (){
    let kriteria = [];
    let bobot = [];
    let totalbobot;
    let alternatif = [];
    let si =[];
    let sialternatif =[];
    let totalsi = [];
    let vi =[];
    let totalvi = [];
    
    return;
}


router.post('/perhitungan',(req,res,next)=>{
    data = req.body;
    const hasil = spk();
    res.json({
        "hasil":hasil
    });
})
module.exports = router;
