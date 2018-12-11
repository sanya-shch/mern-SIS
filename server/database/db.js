const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mern_sis_db');

mongoose.connection
    .once('open', () => console.log('Connected to the database!'))
.on('error', err => console.log('Error with the database!', err));