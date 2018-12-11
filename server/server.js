const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const path = require('path');
// require('./database/db');
const app = express();

const PORT = 5000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('cors')());
// app.use(require('helmet')());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Sessions
app.use(
    session({
        secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false, //required
        saveUninitialized: false //required
    })
);



// Routes
app.use('/user', require('./routes/users'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/students', require('./routes/students'));
app.use('/api/marks', require('./routes/marks'));


if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}

// Starting Server
app.listen(PORT, () => console.log(`App running on port ${PORT}`)  );
