const express = require('express');
const MovieData = require('./src/model/MovieData');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const {Types: {ObjectId}} = mongoose;

var app = new express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./dist/voice-of-movies-frontend'));

const validateObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id; //true or false


// -----------------------ALL ROUTES BEGIN--------------------------


app.delete('/api/movies/delete/:id', (req,res)=> {
  movieId = req.params.id;
  console.log('DELETE: ',movieId);

  MovieData.findByIdAndDelete({"_id":movieId})
  .then(()=>{
      console.log('deleted',movieId)
      res.json({
        'status': true,
        'response': 'Successfully Deleted'
      });
    });
});

app.put('/api/movies/update', (req, res)=> {
  console.log('PUT: Edit Movie -', req.body);
  var id = req.body.movie._id;

  var movie = {       
    movieId : req.body.movie.movieId,
    movieName : req.body.movie.movieName,
    director: req.body.movie.director,
    articleAuthor : req.body.movie.articleAuthor,
    language : req.body.movie.language,
    year : req.body.movie.year,
    genre : req.body.movie.genre,
    description : req.body.movie.description,
    starRating : req.body.movie.starRating,
    likes: req.body.movie.likes,
    imageUrl : req.body.movie.imageUrl
  }

  MovieData.findByIdAndUpdate({"_id":id}, {$set: movie}, {useFindAndModify: false})
    .then((data)=> {
      // console.log('returned',d);
      res.json({
        'endpoint' : '/api/movies/update',
        'status' : true,
        'response' : 'Edit Success'
      });
    });

});

app.post('/api/movies/insert', (req, res)=> {
  console.log('POST: Add Movie -',req.body)
 
  var movie = {       
    movieId : req.body.movie.movieId,
    movieName : req.body.movie.movieName,
    director: req.body.movie.director,
    articleAuthor : req.body.movie.articleAuthor,
    language : req.body.movie.language,
    year : req.body.movie.year,
    genre : req.body.movie.genre,
    description : req.body.movie.description,
    starRating : req.body.movie.starRating,
    likes: req.body.movie.likes,
    imageUrl : req.body.movie.imageUrl
  }
  
  // console.log('app.js-l46-added ',movie.movieName)
  
  var movie = new MovieData(movie);
  movie.save();

});

app.get('/api/movies/:id', (req, res)=> {
  const id = req.params.id;

  if(validateObjectId(id)) {
    MovieData.findOne({"_id":id})
    .then((movie)=>{
      if(!!movie) {
        console.log(`GET: Get a movie: ${movie.movieName}`);
        res.json({
          'endpoint' : '/api/movies/:id',
          'status' : true,
          'response' : movie
        });
      } else {
        res.json({
          'endpoint' : '/api/movies/:id',
          'status' : false,
          'response' : 'Movie with the id found'
        });
      }
    });
  } else {
    console.log('Invalid Object Id');
    res.json({
      'endpoint' : '/api/movies/:id',
      'status' : false,
      'response' : 'Invalid Object id'
    });
  }

});

app.get('/api/movies', (req,res)=> {
    
  MovieData.find()
    .then((movies)=> {
      console.log('GET: All movies')
      if(movies.length != 0) {
        res.json({
          'endpoint' : '/api/movies',
          'status' : true,
          'response' : movies
        });
      } else {
        res.json({
          'endpoint' : '/api/movies',
          'status' : false,
          'response' : 'No movies found'
        });
      }
    });
    
});


app.get("/", (req, res)=> {
  res.send('Hi')
});

// app.get('/*', (req, res)=> {
//   res.sendFile(path.join(__dirname + './dist/voice-of-movies-frontend/index.html'));
// });

// -----------------------ALL ROUTES END--------------------------


const PORT = process.env.PORT || 3333;

app.listen(PORT, ()=> {
  console.log('listening to port 3333');
});

