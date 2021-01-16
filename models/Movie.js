const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  year: { type: String, required: true },
  image: { type: String },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
