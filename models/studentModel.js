const {Schema,model} = require('mongoose');

const studentSchema = new Schema({
    name: {type: String, require:true},
    code:{type:String, require: true},
    //id: Schema.Types.ObjectId,
});

const studentModel = model('students',studentSchema);

module.exports = studentModel;