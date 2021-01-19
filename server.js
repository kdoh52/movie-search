const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
require('dotenv').config();
// const path = require('path')

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // app.get('*', (request, response) => {
  //   response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // });
}
// Add routes, both API and view
app.use(routes);


// Connect to the Mongo DB
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Established connection with MongoDB database.')
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
