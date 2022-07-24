const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Schema = mongoose.Schema;

var NewMovieSchema = new Schema({
  movieId : String,
  movieName : String,
  director : String,
  articleAuthor:String,
  language: String,
  genre: String,  
  year : Number,
  synopsis : String,
  description : String,
  starRating :Number,
  imageUrl : String,
  likes: Number, 
  comments: {  }
});

var MovieData = mongoose.model('movie', NewMovieSchema);  // exports a new movieschema from database named Movies with collection name - movies & Schema - moviedata

module.exports = MovieData;