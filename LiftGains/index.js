const express = require('express');
const path = require('path');
require('./database/mongoose');

const app = express();
app.use(express.urlencoded());

const userRouter = require('./routes/user.js');
app.use(userRouter);

app.use("/imgs",express.static(__dirname + '/imgs'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/scripts",express.static(__dirname + '/scripts'));
app.use('/pages',express.static(__dirname + '/pages'));

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('*', function(req, res) {
    res.redirect('/');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server started on port ${PORT}`);
});