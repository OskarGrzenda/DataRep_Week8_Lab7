const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())


const myConnectionString = 'mongodb+srv://admin:collegepass@cluster0.kebqv.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, {useNewUrlParser: true});
    
const Schema = mongoose.Schema;

var movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
});

//refer to moviemodel to interact with database
var MovieModel = mongoose.model("movie", movieSchema);

app.get('/api/movies', (req, res) => {

    // const mymovies = [
    //     {
    //         "Title":"Avengers: Infinity War",
    //         "Year":"2018",
    //         "imdbID":"tt4154756",
    //         "Type":"movie",
    //         "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //         },
    //         {
    //         "Title":"Captain America: Civil War",
    //         "Year":"2016",
    //         "imdbID":"tt3498820",
    //         "Type":"movie",
    //         "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //         }
    // ];
//finds all documents in my database
MovieModel.find((err, data)=>{
    res.json(data);
})

//     res.status(200).json({
//         message: "Everything is ok",
//         movies: mymovies});
 })

 app.get('/api/movies/:id', (req,res) => {
     console.log(req.params.id);

     MovieModel.findById(req.params.id, (err, data) => {
         res.json(data);
     })
 })

//deletes movie and sends back data once its deleted
 app.delete('/api/movies/:id', (req,res) =>{
     console.log("Delete movie: " + req.params.id);

     MovieModel.findByIdAndDelete(req.params.id,(err, data) =>{
         res.send(data);
     })
 })

//receiving data from application
app.post('/api/movies', (req, res) => {
    console.log('Movie Received');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
        title:req.body.title,
        year:req.body.year,
        poster:req.body.poster
    })

    res.send('Item Added');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})