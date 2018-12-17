const express = require('express');
const router = express.Router();

const toJson = require('meanie-mongoose-to-json');

const teachers = require('../database/models/teacher');

router.get('/', async (req, res) => {
    try {
        const allTeachers = await teachers.find({});
        allTeachers.toJson
        res.send({ allTeachers })
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        await teachers.create({
            name: req.body.name,
            surname: req.body.surname,
            // login: req.body.login,
            // password: req.body.password,
            subjects: req.body.subjects
        });
        res.send({ message: 'The teacher was created' });
    } catch(err) {
        res.status(400).send({ error: err });
    }

});

router.put('/:id', async (req, res) => {
    try {
        await teachers.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: 'The teacher was updated' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await teachers.findByIdAndRemove(req.params.id);
        res.send({ message: 'The teacher was removed' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

router.put('/subj/:id', async (req, res) => {
    try {
        await teachers.findByIdAndUpdate(req.params.id,
            {$push:{"subjects": {
                        subjectName: req.body.subjectName,
                        groups: req.body.groups
                    }
                }});
        res.send({ message: 'The teacher was updated' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

router.delete('/subj/:id_Teacher/:id_Subject', async (req, res) => {
    try {
        await teachers.update(
            { _id: req.params.id_Teacher },
            { $pull: { "subjects": { _id: req.params.id_Subject } } }
            );
        res.send({ message: 'The subject in teacher was removed' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// update subject
router.put('/subj/:id_Teacher/:id_Subject', async (req, res) => {
    try {
        if(!req.body.subjectName && req.body.groups)
            await teachers.updateOne(
                {_id:req.params.id_Teacher, "subjects._id":req.params.id_Subject},
                { $set: {"subjects.$.groups": req.body.groups} }
            );
        else if(req.body.subjectName && !req.body.groups)
            await teachers.updateOne(
                {_id:req.params.id_Teacher, "subjects._id":req.params.id_Subject},
                { $set: {"subjects.$.subjectName": req.body.subjectName} }
            );
        res.send({ message: 'The subject in teacher was updated' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// Get a specific user
router.get('/:id', async (req, res) => {
    try {
        const user = await teachers.findById(req.params.id);
        res.send({ user });
    } catch (err) {
        res.status(404).send({ message: 'User not found!' });
    }
});

module.exports = router;
