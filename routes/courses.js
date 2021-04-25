const express = require('express');
const router = express.Router();
const course = require('../models/coursesModel')
const Joi = require('joi');

function joiValidation(form) {
    const code_pattern = /^[a-zA-z]{3}[0-9]{3}/;
    const joiCourse =Joi.object({
        name:Joi.string().min(5).required(),
        code:Joi.string().length(6).regex(code_pattern).required(),
        description: Joi.string().min(0).max(200),
    })
    return joiCourse.validate(form);
}

//----------------get courses----------------------------------------
router.get('/',async(req,res)=>{
const coursesArr = await  course.find();
res.send(coursesArr);

});

//----------------get 1 courses by id ----------------------------------------
router.get('/:id',async(req,res)=>{
    console.log(req.params.id);
    const one_course = await  course.findById(req.params.id);
    res.send(one_course);
    
    });

//----------------save course----------------------------------------
router.post('/CreateCourse', (req, res) => {
    
    const val_result = joiValidation(req.body)
    if (val_result.error) {
        console.log('err happened');
        return res.status(400).send(val_result.error.details[0].message);
    }

    const s =  new course(req.body);
    s.save().then(()=>{
        console.log('saved');
        res.status(200).send(req.body);
    });

})

// //----------------update course--------------------------------------
router.post('/UpdateCourse',async(req,res)=>{
    
    const obj = {
        name:req.body.name,
        code:req.body.code,
        description: req.body.description
    };
    const val_result = joiValidation(obj)
    if (val_result.error) {
        console.log('err happened');
        return res.status(400).send(val_result.error.details[0].message);
    }
    
    const s = await course.findByIdAndUpdate(req.body.id,obj,{new:true,useFindAndModify:false});
    if (!s) return res.status(404).send('course not found');
    
    res.send(s);
})

//-------------delete course-------------------------------------------
router.post('/DeleteCourse', async (req, res) => {
    const del = await course.findByIdAndRemove(req.body.id,{useFindAndModify:false});
    if (!del) return res.status(404).send('course wasn not found');
    res.send(del);
});

module.exports = router;