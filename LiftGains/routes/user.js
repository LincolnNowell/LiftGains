const express = require('express')
const Users = require('../models/user');
let session = require('express-session');
const nodemailer = require('nodemailer')
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

router.get('/items', async(req,res) =>{
    const name = req.session.Auth;
    const user = await Users.findOne({name});
    if(user){
        res.send(user.items);
    }else{
        res.end();
    }
})

router.get('/user', async(req,res) =>{
    const name = req.session.Auth;
    const user = await Users.findOne({name});
    if(user){
        res.send(user.name);
    }else{
        res.end();
    }
})

router.post('/password-reset', async(req,res)=>{
    req.session.Auth = req.body.name;
})

router.post('/password-reset',async(req,res) =>{
    name = req.body.name;
    const user = await Users.findOne({name});
    if(user){
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'liftgainweb@gmail.com',
              pass: 'L1ftBr0s'
            }
        });
          
        let mailOptions = {
            from: 'liftgainsweb@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: 'Click link to reset password',
            html: '<a href="http://localhost:5000/pages/passwordChange.html>Reset</a>"'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    else
    {
        res.redirect('/pages/passwordReset.html');
    }
})

router.post('/reset', async(req, res) =>{
    let name = req.session.Auth;
    let pwd = req.body.pwd;
    await Users.findOneAndUpdate({"name":name},{$set :{"password": pwd}});
})

router.post('/clear',async(req, res)=>{
    let name = req.session.Auth;
    await Users.findOneAndUpdate({"name":name},{$set :{"items": []}});
})

router.post('/Save',async(req, res)=>{
    let name = req.session.Auth;
    let body = req.body;
    await Users.findOneAndUpdate({"name":name},{$push :{"items": body}});
});

module.exports = router;