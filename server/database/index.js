const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://localhost:27017/userpass' ;
// const uri = 'mongodb://localhost:27017/simple-mern-passport' ;
// const uri = 'mongodb://localhost:27017/mern_sis_db' ;

mongoose.connect(uri).then(
    () => {
        console.log('Connected to Mongo');
    },
    err => {
         console.log('error connecting to Mongo: ');
         console.log(err);
        }
  );

module.exports = mongoose.connection;
