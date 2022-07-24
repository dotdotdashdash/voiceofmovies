const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Schema = mongoose.Schema;

var NewMovieSchema = new Schema({
  movieId : String,
  movieName : String,
  director : String,
  articleAuthor:String,
  year : Number,
  synopsis : String,
  description : String,
  starRating :Number,
  imageUrl : String,
  likes: Number
});

var MovieData = mongoose.model('movie', NewMovieSchema);  // exports a new movieschema from database named movie with Schema - moviedata

module.exports = MovieData;