const uri= "mongodb+srv://cdevito2:se3316@cluster0-88rcf.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(uri, {useNewUrlParser: true,}); //connect to my mongoose db
var Song = require('./models/song'); //get the model of the schema for each 
var Review = require('./models/review');
var User = require("./models/user");


console.log('Connected to the database (mongoose)');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
var app = express()

app.use(cors())


cors({credentials: true, origin: true}) 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers',"Content-Type");
    next();
});
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


/*router.get('/open/songs',function(req,res,next){
    Song.find({}).sort({numOfReviews:"desc"},function(err,songs) {
        if(err)
            return next(err);
        res.send(songs);
    }).limit(10)
});*/

//return a list of 10 songs ordered by average rating
router.get('/open/songs',function(req,res,next){
    Song.find({},function(err,songs) {
        if(err)
            return next(err);
        
        res.send(JSON.stringify(songs));
    })
});
//search by keyword
router.get("/open/search/{x}", function(req,res) {
    json.parse(x);
    
});

//return all reviews for a given song ID.
router.get("/open/reviews/:id", function(req,res,next) {
    Review.find({songId:req.params.id},function(err,reviews){
        if(err)
            return next(err);
     
        res.send(JSON.stringify(reviews));
    })

});

//Return all songs which are marked as copyright violations
router.get("/admin/copyright", function(req,res,next) {
    Song.find({"copyrightValidation":true},function(err,result) {
        if (err)
            return next(err);
        res.send(result)
    })
});

//Create a new review for the song with the given ID based on JSON array provided in the body.
router.put("/secure/add-review/:id",function(req,res) { //create review
    
    var review = new Review({
        songId:req.body.songId,
        rating:req.body.rating,
        userId:req.body.userId,
        reviewComment:req.body.reviewComment
    })
    review.save(function(err) {
        if(err)
            res.send("error: "+err);
        //res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
        //res.header('Access-Control-Allow-Origin',"*");
        res.send(JSON.stringify(review));
    })
    //res.send("updated item");
    


});
router.post("/secure/song",function(req,res) { //save the JSON array for a song in the database and return the ID
    var song = new Song({
        title:req.body.title,
        artist:req.body.artist,
        album:req.body.album,
        year:req.body.year,
        track:req.body.track,
        genre:req.body.genre
    });
    song.save(function (err) {
        if (err) {
            res.send("error: "+err);
        }
        
        //res.send(song);
    })
    res.send(song._id);
});
router.put('/secure/song/:id',function(req,res) { //update the record of the given song ID with JSON array of properties sent in the body.
    Review.findByIdAndUpdate(req.params.id, {$set: req.body},function(err) {
        if (err)
            res.send("error: "+err);
    })
     res.send("updated item");
});

router.post("/admin/copyright/:id",function(req,res)//Set or update copyright violation attributes for a given song ID. JSON array with new values is provided in the body.
 {

});


router.post("/secure/user",function(req,res) {
    var user = new User({
        password:req.body.password,
        email:req.body.email,
        isAdmin:req.body.isAdmin,
        isActive:req.body.isActive
        
    });
    user.save(function (err) {
        if (err) {
            res.send("error: "+err);
        }
        res.send(user);
    })
});



