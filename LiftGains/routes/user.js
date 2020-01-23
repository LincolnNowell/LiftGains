const express = require('express')
const Users = require('../models/user');
let session = require('express-session');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/submit-form',async(req,res)=>{
    const name = req.body.name;
    const pwd = req.body.password;
    const user = await Users.findOne({name});
    if(user && bcrypt.compare(pwd,user.password)){
        req.session.Auth = name;
        res.status(200).redirect('/pages/Schedule.html'); 
    }else{
        res.status(200).redirect('/pages/login.html');
    }
    res.end();
})

router.post('/create-account',async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    let salt = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(req.body.password,salt);
    let NewUser = new Users({
        name: name,
        email: email,
        password: pwd
    })
    
    const user = await Users.findOne({name});
    if(user){
        res.status(200).redirect('/pages/login.html'); 
    }else{
        NewUser.save();
        req.session.Auth = name;
        res.status(200).redirect('/pages/Schedule.html');
    }

    res.end();
})

router.post('/Save',async(req, res)=>{
    let name = req.session.Auth;
    let body = req.body;
    //await Users.findOneAndUpdate({"name":name},{$set :{"item": body}});
    await Users.findOneAndUpdate({"name":name},{$push :{"items": body}});
});

module.exports = router;