const express = require('express');
const MovieData = require('./src/model/MovieData');
const cors = require('cors');
const path = require('path');

var app = new express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./dist/voice-of-movies-frontend'));


app.get('/api/movies/:id', (req, res)=> {
  const id = req.params.id;
  console.log(id);

  MovieData.findOne({"_id":id})
  .then((movie)=>{
      console.log(`GET: View movie: ${movie.movieName}`);
      res.send(movie);
  });

});

app.post('/api/movies/insert', (req, res)=> {
 
  var movie = {       
    movieId : req.body.movie.movieId,
    movieName : req.body.movie.movieName,
    director: req.body.movie.director,
    articleAuthor : req.body.movie.articleAuthor,
    year : req.body.movie.year,
    synopsis : req.body.movie.synopsis,
    description : req.body.movie.description,
    starRating : req.body.movie.starRating,
    likes: req.body.movie.likes,
    imageUrl : req.body.movie.imageUrl
  }
  
  console.log('app.js-l29',movie)
  
  var movie = new MovieData(movie);
  movie.save();

});

app.get('/api/movies', (req,res)=> {
    
  MovieData.find()
    .then((movies)=> {
      console.log('Get: All movies')
      res.send(movies);
    });
    
});


// app.get("/", (req, res)=> {
//   res.send('Hi')
// });

// app.listen(3333, ()=> {
//   console.log('listening to port 3333');
// });

app.get('/*', (req, res)=> {
  res.sendFile(path.join(__dirname + './dist/voice-of-movies-frontend/index.html'));
});
  