// mongoose imported
const mongoose = require("mongoose");

// connecting to the database
mongoose.connect(
  "mongodb+srv://faisal:faisal@cluster0.xdsajmk.mongodb.net/?retryWrites=true&w=majority"
);

//Mongoose connection to check if it is succesfull
const db = mongoose.connection;

// checking the error
db.on("error", console.error.bind(console, "error in connecting the database"));

// if up and running then ConsoleLog message
db.once("open", function () {
  console.log("successfully connected to database!!");
});

// exporting a db
module.exports = db;
