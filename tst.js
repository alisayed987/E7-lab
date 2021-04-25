const Joi = require('joi');

const str="'''aaa'_-'''";

var patt ='^([a-zA-Z]*\'*-*)*$';
//const jo =Joi.string().pattern(new RegExp('^\'*-*[a-zA-Z]*\'*-*[a-zA-Z]*$'));
const jo =Joi.string().pattern(new RegExp(patt));

var result = jo.validate(str);
// console.log(result);

if(result.error){
    console.log('yes error');
}
else{
    console.log('no error');
}