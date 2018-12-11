const mongoose = require('mongoose');
const toJson = require('meanie-mongoose-to-json');
const Schema = mongoose.Schema;

const MarkSchema = new Schema({
    // login: String,
    studentId: String,
    // teacherId: String,
    groupN: String,
    subjectName:  String,
    text: String,
    marks: [new Schema({
        // id: Schema.Types.ObjectId,
        // text: String,
        markN: Number,
        present: Boolean,
        createdt: String
    })]
});

MarkSchema.plugin(toJson);

module.exports = mongoose.model('marks', MarkSchema);
