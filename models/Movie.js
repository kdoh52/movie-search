const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Array, required: true },
//   synopsis: { type: String },
  image: { type: String },
//   link: { type: String }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
