const mongoose = require('mongoose');
const toJson = require('meanie-mongoose-to-json');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 33,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 33,
        trim: true
    },
    // login: {
    //     type: String,
    //     required: true,
    //     minlength: 3,
    //     maxlength: 33,
    //     trim: true
    // },
    // password: {
    //     type: String,
    //     required: true,
    //     minlength: 3,
    //     maxlength: 33,
    //     trim: true
    // },
    subjects: [new Schema({
        subjectName: {
            type: String,
            minlength: 3,
            maxlength: 33,
            trim: true
        },
        // id: Schema.Types.ObjectId,
        groups: {
            type: String,
            minlength: 3,
            maxlength: 33,
            trim: true
        }
    })]
});

TeacherSchema.plugin(toJson);

module.exports = mongoose.model('teachers', TeacherSchema);
