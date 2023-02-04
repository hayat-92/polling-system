// To Import express package
const express = require("express");

// importing db for setting up database
const db = require("./config/moongose");

// initializing express
const app = express();

// bodyParser Imported
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

// use bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// adding middleware for setting up our routes
app.use(require("./routes"));

// running our server and listening on a port 8000
app.listen(port, (err) => {
  if (err) {
    console.log("error in connection the server", err);
    return;
  }
  console.log("server is running on a port 8000");
});
