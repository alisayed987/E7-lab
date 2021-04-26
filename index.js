const express = require('express');
const app = express();
const mongoose  =require('mongoose');
const Joi = require('joi');
const courses = require('./routes/courses');
const students = require('./routes/students');
const fs = require('./routes/fs');
var bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const DB = process.env.DB_CONN ;

mongoose.connect(DB,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log('connected to DB'))
.catch((err)=>console.error(err));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/courses',courses);
app.use('/api/students',students);
app.use('/web',fs);
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/fs_Bouns.html'));
});

const port = process.env.PORT || 3000 ;
app.listen(port,()=>console.log(`listining to port ${port}`))    