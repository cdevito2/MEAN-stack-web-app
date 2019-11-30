const uri= "mongodb+srv://cdevito2:se3316@cluster0-88rcf.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(uri, {useNewUrlParser: true,}); //connect to my mongoose db
var Song = require('./models/song'); //get the model of the schema for each 
var Review = require('./models/review');
var User = require("./models/user");
//code grabbed from jagath parts.db
const jwt = require('jsonwebtoken');
//const secret = process.env.JWT_KEY;
argon2i = require('argon2-ffi').argon2i
crypto = require('crypto')

var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy

const passport = require('passport');
console.log('Connected to the database (mongoose)');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
var app = express()

app.use(cors())
//may have to put this lower
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret:"sdfnsdofindsonds",
    cookie:{secure:true},
    saveUninitialized:true,
    resave:false
}));
cors({credentials: true, origin: true}) 
app.use(express.json())

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
    res.send('hooray! welcome to our api!' );   
});

router.get('/loginsuccess', function(req, res) {
    res.send('you loggin in');   
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
        
        res.send(songs);
    })
});
//search by keyword
router.get("/open/search/{x}", function(req,res) {
    json.parse(x);
    
});


//return most recent review for a given song ID.
router.get("/open/recentreviews/:id", function(req,res,next) {
    Review.find({songId:req.params.id}).sort({submittedOn:'desc'}).limit(1)
    .exec(function(err,reviews){
        if(err)
            res.send(err);
        return res.send(JSON.stringify(reviews))
    })
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
    if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

	const token = req.headers.authorization.split(" ");
	if (! token[0].startsWith("Bearer")) { // Check first element. Must be "Bearer"
		return res.status(401).send("Access denied. Missing Token.");
    }
    try{
    Song.find({"copyrightValidation":true},function(err,result) {
        if (err)
            return next(err);
        res.send(result)
    })
    }
        catch(ex){
                return res.send("error finding from songdb");
            }
});

//Create a new review for the song with the given ID based on JSON array provided in the body.
router.put("/secure/add-review/:id",function(req,res) { //create review
    /*if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

	const token = req.headers.authorization.split(" ");
	if (! token[0].startsWith("Bearer")) { // Check first element. Must be "Bearer"
		return res.status(401).send("Access denied. Missing Token.");
    }*/
    try{

    //const payload = jwt.verify(token[1], secret);
	//console.log("JWT: ", JSON.stringify(payload));

    var review = new Review({
        songId:req.body.songId,
        rating:req.body.rating,
        userId:req.body.userId,
        reviewComment:req.body.reviewComment,
        submittedOn:req.body.submittedOn
    })
    review.save(function(err) {
        if(err)
            res.send("error: "+err);
        //res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
        //res.header('Access-Control-Allow-Origin',"*");
        res.send(review._id);
    })
    }catch(ex){
        return res.status(401).send("Access denied. Invalid token.");
    }
    //res.send("updated item");
    


});
router.post("/secure/song",function(req,res) { //save the JSON array for a song in the database and return the ID
    
    try{
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
}
catch(ex){
    res.send("error adding song");
}
});
router.put('/secure/song/:id',function(req,res) { //update the record of the given song ID with JSON array of properties sent in the body.
    
    try{
       
    Review.findByIdAndUpdate(req.params.id, {$set: req.body},function(err) {
        if (err)
            res.send("error: "+err);
    })
     res.send(JSON.parse("updated item"));
    }
    catch(ex)
    {
        res.send(ex);
    }
});

router.post("/admin/copyright/:id",function(req,res)//Set or update copyright violation attributes for a given song ID. JSON array with new values is provided in the body.
 {

});

router.put("/admin/enable/:id",function(req,res)
{
    console.log("hi")
    User.findByIdAndUpdate(req.params.id, {$set: req.body},function(err,user) {
        if (err)
            res.send("error: "+err);
        console.log(user);
    })

     res.send(JSON.stringify("updated!"));
    
})

/*router.post("/secure/user",function(req,res) {
    if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

	const token = req.headers.authorization.split(" ");
	if (! token[0].startsWith("Bearer")) { // Check first element. Must be "Bearer"
		return res.status(401).send("Access denied. Missing Token.");
    }
    try{

    //have to hash password
    const payload = jwt.verify(token[1], secret);
    console.log("JWT: ", JSON.stringify(payload));
    //hash here!
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
    }
    catch(ex)
    {
        res.send("error creating user")
    }
});*/

router.post("/open/register",function(req,res) { //replacing the above route
    //it is open because the person registering doesnt have the jwt as they dont have an account
    //create acc and give them the jwt
    
    const { email, password } = req.body;
    let errors = [];
    if (!email || !password) {
        //errors.push({ msg: 'Please enter all fields' });
        res.send("enter all fields");
      }
    
    /*if (errors.length > 0) {
        res.send("erros man");
      }*/
    else
    {
        User.findOne({ email: email }).then(user => {
            if (user) 
            {
              res.send("email already exists");
            }
            else { //if email doesnt exist then its a new account so create a new user
                const newUser = new User({
                  email,
                  password,
                  isActive:true,
                  isAdmin:false
                });
                crypto.randomBytes(32, function(err, salt) { 
                    if(err) throw err; 
                    //store password with argon 2
                    argon2i.hash(req.body.password, salt).then(hash => { 
                      console.log(hash);
                      newUser.password = hash;
                      newUser.save(function (err) {
                        if (err) {
                            res.send("error: "+err);
                        }
                      });
                    });
                
                });
                res.send(newUser); 
               
            }    
        });
        
    }
}); //end of create user fcn

router.post('/open/login',passport.authenticate('local',{failureRedirect: '/api/open/login/error'}),(req,res)=>{
    res.send(JSON.stringify(req.user));
})

router.post('/open/adminlogin',passport.authenticate('local',{failureRedirect: '/api/open/login/error'}),(req,res)=>{
    res.send(req.user);
})

router.get("/open/login/error",function(req,res){
    res.send(JSON.stringify("you entered invalid info"))
});
  

//for auth user(not admin)
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        // Match user
        console.log("in passport local strategy")
       User.findOne({email:email}, function(err,user){
           if(err){
            console.log("cant find user")
            return done(null,false)
             }
            
        else{
            if (!user){
                return done(null,false,{ message: 'That email is not registered' })
            }
            else{
                if(user.isActive == false)
                {
                return done(null,false)
                }
                //password check
                console.log(user.password);
                console.log(password)
                
                var pWord = new Buffer(password);
                var result;
                argon2i.verify(user.password,pWord).then(correct => 
                    {
                        result = correct;
                        console.log("correct")
                        console.log(correct)
                        if (correct == true)
                        {
                
                            return done(null,user)
                        }
                        else{
                            return done(null,false)
                        }
                    })
                }
        }
       }) 
      
      
      passport.serializeUser(function(user, done) {
          done(null, user._id);
        });
      
        passport.deserializeUser(function(id, done) {
          User.findById(id, function(err, user) {
            done(err, user);
          });
        });
        })
); 
 





