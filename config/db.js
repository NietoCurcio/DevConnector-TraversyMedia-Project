const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //take the string

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }); //await because return something, return a promise
    //the connect method give us a promise
    // with promises we can use either .then .catch, or async await

    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
    // exit process with failure
  }
  // try catch if we cant connect to our database
  //   in the most cases, when we use async await, we use try catch
};

module.exports = connectDB;
