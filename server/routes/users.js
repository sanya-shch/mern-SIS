// const express = require('express');
// const router = express.Router();
//
// const toJson = require('meanie-mongoose-to-json');
//
// // User model
// const Users = require('../models/users');
//
// // @route   GET /api/users/
// // @desc    Get all users
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     const users = await Users.find({});users.toJson;
//     res.send({ users })
//   } catch(err) {
//     res.status(400).send({ error: err });
//   }
// });
//
// // @route   GET /api/users/:id
// // @desc    Get a specific user
// // @access  Public
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await Users.findById(req.params.id);
//     res.send({ user });
//   } catch (err) {
//     res.status(404).send({ message: 'User not found!' });
//   }
// });
//
// // @route   POST /api/users/
// // @desc    Create a user
// // @access  Public
// router.post('/', async (req, res) => {
//   try {
//     const newUser = await Users.create({
//         name: req.body.name,
//         surname: req.body.surname,
//         login: req.body.login,
//         password: req.body.password,
//         role: req.body.role
//     });
//      res.send({ newUser });
//   } catch(err) {
//     res.status(400).send({ error: err });
//   }
//
// });
//
// // @route   PUT /api/users/:id
// // @desc    Update a user
// // @access  Public
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
//      res.send({ message: 'The user was updated' });
//   } catch(err) {
//     res.status(400).send({ error: err });
//   }
// });
//
// // @route   DELETE /api/users/:id
// // @desc    Delete a user
// // @access  Public
// router.delete('/:id', async (req, res) => {
//   try {
//     const removeUser = await Users.findByIdAndRemove(req.params.id);
//      res.send({ message: 'The user was removed' });
//   } catch(err) {
//     res.status(400).send({ error: err });
//   }
// });
//
// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../database/models/user');
const passport = require('../passport');

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password, role, userId } = req.body;
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password,
                role: role,
                userId: userId
            });
            newUser.save((err, savedUser) => {
                if (err) return res.json(err);
                res.json(savedUser)
            })
        }
    })
});

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body);
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        let userInfo = {
            // username: req.user.username
            role: req.user.role,
            userId: req.user.userId
        };
        res.send(userInfo);
    }
);

router.get('/', (req, res, next) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
});

module.exports = router;
