const express = require('express');
const router = express.Router();
const student = require('../models/studentModel')
const Joi = require('joi');

function joiValidation(form) {
    const name_pattern = '^([a-zA-Z]*\'*-*)*$';
    const joiStudent = Joi.object({
        // id: Joi.string(),
        name: Joi.string().pattern(new RegExp(name_pattern)).required(),
        code: Joi.string().length(7)
    })
    return joiStudent.validate(form);
}



//----------------get students--------------------------------------
router.get('/',async (req, res) => {
    const studentsArr = await student.find();
    res.send(studentsArr);
});

//----------------get 1 student--------------------------------------
router.get('/:id',async (req, res) => {
    console.log(req.params.id);
    const one_student = await student.findById(req.params.id);
    res.send(one_student);
});

//----------------save student--------------------------------------
router.post('/CreateStudent', async(req, res) => {
    const val_result = joiValidation(req.body);
    // console.log(val_result);
    if (val_result.error) {
       return res.status(400).send(val_result.error.details[0].message);
    
    }

    const s =  new student(req.body);
    s.save().then(()=>console.log('Student saved'));

});

//----------------update student--------------------------------------
router.post('/UpdateStudent',async(req,res)=>{
    
    const obj = {
        name:req.body.name,
        code:req.body.code
    };
    const val_result = joiValidation(obj)
    if (val_result.error) {
        console.log('err happened');
        return res.status(400).send(val_result.error.details[0].message);
    }
    
    const s = await student.findByIdAndUpdate(req.body.id,obj,{new:true,useFindAndModify:false});
    if (!s) return res.status(404).send('student not found');
    
    res.send(s);
})

//-------------delete student-------------------------------------------
router.post('/DeleteStudent', async (req, res) => {
    const del = await student.findByIdAndRemove(req.body.id,{useFindAndModify:false});
    if (!del) return res.status(404).send('student wasn not found');
    res.send(del);
});


module.exports = router;