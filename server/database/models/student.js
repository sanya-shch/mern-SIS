const mongoose = require('mongoose');
const toJson = require('meanie-mongoose-to-json');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: String,
    surname: String,
    login: String,
    password: String,
    groupN: String,
    subjects: [new Schema({
        subjectName:  String,
        // id: Schema.Types.ObjectId,
        // marks: [new Schema({
        //     id: Schema.Types.ObjectId,
        //     markN: Number,
        //     present: Boolean,
        //     createdt: Date
        // })]
    })]
});

StudentSchema.plugin(toJson);

module.exports = mongoose.model('students', StudentSchema);
