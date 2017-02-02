//Load modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Load Routers
const mainRouter = require('./routes/index');
const apiRouter = require('./routes/api');




//Server config 
const PORT = 8000 || process.env.PORT;
const DB = "mongodb://localhost/angularHuman";

const app = express();

//Express config
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/client'));

app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');

//Routers
app.use('/', mainRouter);
app.use('/api', apiRouter);


//connect to database..
mongoose.connect(DB, function(err) {
  if(err) {
    console.log('Failed to connect to database' + err);
    return err;
  } else {
    console.log('Connected succesfully to ' + DB);
  }
});

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});