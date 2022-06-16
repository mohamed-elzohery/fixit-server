const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
 
const errorHandler = require('./middlewares/errorHandler');


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));



// handle Previous URL Of middleware
app.all('*', (req, res) => {
  res.json({
    status: 'Failure',
    message: 'wrong url',
  });
});

// global error Handler
app.use(errorHandler);

module.exports = app;