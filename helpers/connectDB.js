const mongoose = require('mongoose');

const connectDB = (dbUrl) => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log('DB connected');
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;