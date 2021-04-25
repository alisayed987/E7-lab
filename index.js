const express = require('express');
const app = express();
const mongoose  =require('mongoose');
const Joi = require('joi');
const courses = require('./routes/courses');
const students = require('./routes/students');
var bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/myLMS',{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log('connected to DB'))
.catch((err)=>console.error(err));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/courses',courses);
app.use('/api/students',students);


const port =  3000 ;
app.listen(port,()=>console.log(`listining to port ${port}`))    