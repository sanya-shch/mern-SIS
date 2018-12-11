const express = require('express');
const router = express.Router();

const toJson = require('meanie-mongoose-to-json');

const students = require('../database/models/student');

router.get('/', async (req, res) => {
    try {
        const st = await students.find({});
        st.toJson;
        res.send({ st })
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        await students.create({
            name: req.body.name,
            surname: req.body.surname,
            login: req.body.login,
            password: req.body.password,
            groupN: req.body.groupN,
            subjects: req.body.subjects
        });
        res.send({ message: 'The student was created' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    try {
        await students.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: 'The student was updated' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// delete student
router.delete('/:id', async (req, res) => {
    try {
        await students.findByIdAndRemove(req.params.id);
        res.send({ message: 'The student was removed' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// add subject
router.put('/subj/:id', async (req, res) => {
    try {
        await students.findByIdAndUpdate(req.params.id,
            {$push:{"subjects": {
                        subjectName: req.body.subjectName
                        // marks: req.body.marks
                    }
            }});
        res.send({ message: 'The student was updated' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// delete subject
router.delete('/subj/:id_Student/:id_Subject', async (req, res) => {
    try {
        await students.update( { _id: req.params.id_Student }, { $pull: { "subjects": { _id: req.params.id_Subject } } } );
        res.send({ message: 'The subject in student was removed' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// update subject
router.put('/subj/:id_Student/:id_Subject', async (req, res) => {
    try {
        await students.updateOne({_id:req.params.id_Student, "subjects._id":req.params.id_Subject},
            { $set: {  "subjects.$.subjectName": req.body.subjectName } }
        );

        res.send({ message: 'The student was updated' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// Get a specific student
router.get('/:id', async (req, res) => {
    try {
        const st = await students.findById(req.params.id);
        res.send({ st });
    } catch (err) {
        res.status(404).send({ message: 'User not found!' });
    }
});

// Get a specific students
router.get('/:groups/:subjectName', async (req, res) => {
    try {
        const st = await students.find({groupN:req.params.groups, "subjects": {
                "$elemMatch": {
                    "subjectName": req.params.subjectName
                }
            }});
        res.send({ st });
    } catch (err) {
        res.status(404).send({ message: 'User not found!' });
    }
});

module.exports = router;
