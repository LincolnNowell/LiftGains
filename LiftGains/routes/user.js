const express = require('express')
const router = express.Router()

router.post('/submit-form',(req,res)=>{
    const email = req.body.email;
    const pwd = req.body.email;
    
    if(email != 'whatever@gmail.com'){
        res.status(200).redirect('/pages/scheduler.html');
    }else{
        res.status(200).redirect('/pages/login.html');
    }
    res.end();
})

module.exports = router;