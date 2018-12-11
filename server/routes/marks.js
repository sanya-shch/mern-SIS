const express = require('express');
const router = express.Router();

const toJson = require('meanie-mongoose-to-json');

const marks = require('../database/models/marks');

// Get all marks
router.get('/', async (req, res) => {
    try {
        const allMarks = await marks.find({});
        allMarks.toJson;
        res.send({ allMarks })
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// Create a mark
router.post('/', async (req, res) => {
    try {
        await marks.create({
            studentId: req.body.studentId,
            groupN: req.body.groupN,
            subjectName:  req.body.subjectName,
            text: req.body.text,
            marks: req.body.marks
        });
        res.send({ message: 'The mark was created' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// Update a mark
router.put('/:id', async (req, res) => {
    try {
        await marks.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: 'The mark was updated' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// Delete a mark
router.delete('/:id', async (req, res) => {
    try {
        await marks.findByIdAndRemove(req.params.id);
        res.send({ message: 'The mark was removed' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// add subject mark
router.put('/mark/:id', async (req, res) => {
    try {
        let today  = new Date();
        console.log();
        await marks.findByIdAndUpdate(req.params.id,
            {$push:{"marks": {
                        // text: req.body.text,
                        markN: req.body.markN,
                        present: req.body.present,
                        createdt: today.toLocaleDateString()
                    }
                }});
        res.send({ message: 'The mark was created' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// delete subject mark
router.delete('/mark/:id_SubjectMark/:id_Mark', async (req, res) => {
    try {
        await marks.update(
            { _id: req.params.id_SubjectMark },
            { $pull: { "marks": { _id: req.params.id_Mark } } }
        );
        res.send({ message: 'The mark was removed' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// update subject mark
router.put('/mark/:id_Teacher/:id_Subject', async (req, res) => {
    try {
        if(req.body.markN)
            await marks.updateOne(
                {_id:req.params.id_Teacher, "marks._id":req.params.id_Subject},
                { $set: {"marks.$.markN": req.body.markN} }
            );
        else if(req.body.present)
            await marks.updateOne(
                {_id:req.params.id_Teacher, "marks._id":req.params.id_Subject},
                { $set: {"marks.$.present": req.body.present} }
            );
        else if(req.body.createdt)
            await marks.updateOne(
                {_id:req.params.id_Teacher, "marks._id":req.params.id_Subject},
                { $set: {"marks.$.createdt": req.body.createdt} }
            );
        res.send({ message: 'The mark was updated' });
    } catch(err) {
        res.status(400).send({ error: err });
    }
});

// Get a one specific user
router.get('/:id/:subjectName', async (req, res) => {
    try {
        const specificMarks = await marks.find({studentId:req.params.id, subjectName: req.params.subjectName});
        res.send({ specificMarks });
    } catch (err) {
        res.status(404).send({ message: 'User not found!' });
    }
});

// Get a specific users
router.get('/marks/:groups/:subjectName', async (req, res) => {
    try {
        const specificMarks = await marks.find({groupN:req.params.groups, subjectName: req.params.subjectName});
        res.send({ specificMarks });
    } catch (err) {
        res.status(404).send({ message: 'User not found!' });
    }
});

module.exports = router;
