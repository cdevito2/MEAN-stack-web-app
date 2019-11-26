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
router.get('/open/songs',function(req,res,next){
    Song.find({},function(err,songs) {
        if(err)
            return next(err);
        res.send(songs);
    })
});

router.get("/open/search/{x}", function(req,res) {
    json.parse(x);
    
});

router.get("/open/reviews/:id", function(req,res,next) {
    Review.find({_id:req.params.id },function(err,reviews){
        if(err)
            return next(err);
     
        res.send(reviews);
    })

});

router.get("/admin/copyright", function(req,res,next) {
    Song.find({"copyrightValidation":true},function(err,result) {
        if (err)
            return next(err);
        res.send(result)
    })
});

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
        res.send(review);
    })
    
    
     res.send("updated item");


});
router.post("/secure/song",function(req,res) { //create new song
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
        res.send(song);
    })
});
router.put('/secure/song/:id',function(req,res) { //update song based on parameters
    Song.findByIdAndUpdate(req.params.id, {$set: req.body},function(err) {
        if (err)
            res.send("error: "+err);
    })
     res.send("updated item");
});

router.post("/admin/copyright/:id",function(req,res) {

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



