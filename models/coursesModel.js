const {Schema,model} = require('mongoose');

const courseSchema = new Schema({
    name: {type: String, require:true},
    code:{type:String, require: true},
    //id: Schema.Types.ObjectId,
    description:String
});

const courseModel = model('courses',courseSchema);

module.exports = courseModel;
