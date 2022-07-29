const mongoose = require('mongoose');
  
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Movies';
console.log(mongoURI);

mongoose.connect(mongoURI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((succ)=> {
  console.log('Connected to MongoDB');
}).catch((err)=> {
  console.log("MongoDB Connection Error");
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
  comments: [{ 
    commentName : String,
    commentText: String,
    commentDate: String
   }]
});

var MovieData = mongoose.model('movie', NewMovieSchema);  // exports a new movieschema from database named Movies with collection name - movies (pluralized 'movie') & Schema - NewMovieSchema

module.exports = MovieData;