const express = require('express');
const MovieData = require('./src/model/MovieData');
const cors = require('cors');

var app = new express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/movies/insert', (req,res)=> {
  console.log('Received post request', req.body);
  res.send(req.body);
 
  var movie = {       
    movieId : req.body.movieId,
    movieName : req.body.movieName,
    director: req.body.director,
    articleAuthor : req.body.articleAuthor,
    year : req.body.year,
    synopsis : req.body.synopsis,
    description : req.body.description,
    starRating : req.body.starRating,
    likes: req.body.likes,
    imageUrl : req.body.imageUrl
  }
  
  console.log('post content',movie)
  
  var movie = new MovieData(movie);
  movie.save();

});

app.get('/movies', (req,res)=> {
    
  MovieData.find()
    .then((movies)=> {
      console.log('Get: All products')
      res.send(movies);
    });
    
});


app.get("/", (req, res)=> {
  res.send('Hi')
});

app.listen(3333, ()=> {
  console.log('listening to port 3333');
});