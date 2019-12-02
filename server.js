const uri= "mongodb+srv://cdevito2:se3316@cluster0-88rcf.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(uri, {useNewUrlParser: true,}); //connect to my mongoose db
var Song = require('./models/song'); //get the model of the schema for each 
var Review = require('./models/review');
var User = require("./models/user");
var AdminPolicy = require('./models/AdminPolicy')
const jwt = require('jsonwebtoken');
argon2i = require('argon2-ffi').argon2i
crypto = require('crypto')
var sanitize = require('sanitize-html');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
console.log('Connected to the database (mongoose)');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
var app = express()
var secret = "hello"



app.use(cors())
//may have to put this lower
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret:"hello",
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


//return a list of 10 songs ordered by numofReviews
router.get('/open/songs',function(req,res,next){
    Song.find({visible:true}).sort({numOfReviews:-1})
    .exec(function(err,songs){
        if(err)
            return next(err);
        return res.send(songs)
    })
});

//search by keyword-need to return each visible song for it

Song.collection.dropIndex("title_text");
Song.collection.createIndex({"title":"text", "track": "text","album": "text","year": "text","genre": "text"})
router.get('/open/search/:keyword',function(req,res,next){
    Song.find( { $text: { $search: req.params.keyword } }).exec(function(err,songs){
        console.log(songs)
        if(err)
            return next(err);
        return res.send(songs)
    })
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
router.get('/open/policies', function(req, res) {
    AdminPolicy.findOne({}).sort({ created: -1 }).exec(function(err, policy) {
        if (err) 
        {
            res.json({error: 'Error retrieving policies.'});
        } 
        else {res.send(policy);};
    });
});
//Return all songs which are marked as copyright violations
router.get("/admin/copyright", function(req,res,next) {
    if (typeof req.headers.authorization === 'undefined')
    return res.status(401).send("Access denied. Missing Auth header.");

    const token = req.headers.authorization;
    try{
    Song.find({"copyrightValidation":true},function(err,result) {
        if (err)
            return next(err);
        res.send(result)
    })
    }
    catch(ex){
        return res.status(401).send("Access denied. Invalid token.");
    }
});

//Create a new review for the song with the given ID based on JSON array provided in the body.
router.put("/secure/add-review/:id",function(req,res) { //create review
    if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

    const token = req.headers.authorization;
    console.log("header: ")
    console.log(token)
    try{

    const payload = jwt.verify(token, secret);
	console.log("JWT: ", JSON.stringify(payload));

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
    }
    catch(ex){
        return res.status(401).send("Access denied. Invalid token.");
    }
    //res.send("updated item");
    


});
router.post("/secure/song",function(req,res) { //save the JSON array for a song in the database and return the ID
    if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

    const token = req.headers.authorization;
    console.log("auth header: ")
    
    console.log(req.headers.authorization)
	/*if (! token[0].startsWith('"\\"Bearer')) { // Check first element. Must be "Bearer"
		return res.status(401).send("Access denied. Missing Token.");
    }*/
    
    try{
    
    console.log(jwt.verify(token, secret));
    const payload = jwt.verify(token, secret);
    console.log("JWT: ", JSON.stringify(payload));  
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
        return res.status(401).send("Access denied. Invalid token.")
    }
});
router.put('/secure/song/:id',function(req,res) { //update the record of the given song ID with JSON array of properties sent in the body.
   

        if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

    const token = req.headers.authorization;
    try{
    const payload = jwt.verify(token, secret);
    console.log("JWT: ", JSON.stringify(payload));
    Review.findByIdAndUpdate(req.params.id, {$set: req.body},function(err) {
        if (err)
            res.send("error: "+err);
    })
     res.send(JSON.parse("updated item"));
    }
    catch(ex)
    {
        return res.status(401).send("Access denied. Invalid token.")
    }
});

router.put('/open/song/:id',function(req,res) { //update the record of the given song ID with JSON array of properties sent in the body.
Song.findByIdAndUpdate(req.params.id, {$set: req.body},function(err,user) {
    if (err)
        res.send("error: "+err);
    console.log(user)
})

 res.send("updated item");
});


router.post("/admin/copyright/:id",function(req,res)//Set or update copyright violation attributes for a given song ID. JSON array with new values is provided in the body.
 {

});



var stringSanitize = function(str) {
	return sanitize(str, {allowedTags: []});
};
router.post('/admin/update', function(req, res) {
    //add jwt stuff before 
    if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

    const token = req.headers.authorization;
    try{
    const payload = jwt.verify(token, secret);
	console.log("JWT: ", JSON.stringify(payload));
    var newAdminPol = new AdminPolicy({
        dcma: stringSanitize(req.body.dcma),
        copyright: stringSanitize(req.body.copyright),
        security: stringSanitize(req.body.security),
        privacy: stringSanitize(req.body.privacy),
        created: new Date()
    });
    newAdminPol.save(function (err) {
        if (err) {
            res.send("error: "+err);
        }
    });
    res.send("successful update of policies")
    }
    catch(ex)
    {
        return res.status(401).send("Access denied. Invalid token.");
    }
});


router.put("/admin/enable/:id",function(req,res)
{
    if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

    const token = req.headers.authorization;
    try{
    const payload = jwt.verify(token, secret);
	console.log("JWT: ", JSON.stringify(payload));
    console.log("hi")
    User.findByIdAndUpdate(req.params.id, {$set: req.body},function(err,user) {
        if (err)
            res.send("error: "+err);
        console.log(user);
    })

     res.send(JSON.stringify("updated!"));
    }
    catch(ex)
    {
        return res.status(401).send("Access denied. Invalid token.");
    }  
})

router.put("/admin/toggle/:id",function(req,res)
{
    if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

    const token = req.headers.authorization;
    try{
    console.log("hi")
    User.findByIdAndUpdate(req.params.id, {$set: req.body},function(err,user) {
        if (err)
            res.send("error: "+err);
        console.log(user);
    })

     res.send(JSON.stringify("updated!"));
    }
    catch(ex)
    {
        return res.status(401).send("Access denied. Invalid token.");
    }  
})

router.put("/admin/togglesong/:id",function(req,res)
{
    if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

    const token = req.headers.authorization;
    try{
    const payload = jwt.verify(token, secret);
	console.log("JWT: ", JSON.stringify(payload));
    console.log("hi")
    Song.findByIdAndUpdate(req.params.id, {$set: req.body},function(err,song) {
        if (err)
            res.send("error: "+err);
        console.log(song);
    })

     res.send(JSON.stringify("updated!"));
    }
    catch(ex)
    {
        return res.status(401).send("Access denied. Invalid token.");
    }
    
})


router.post("/open/register",function(req,res) { //replacing the above route
    const { email, password } = req.body;
    if (!email || !password) {
        res.send("enter all fields");
      }
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
                    ;
                });
                     // make up a payload for JWT
                let payload = newUser.toJSON()
		        let token = jwt.sign(payload, secret);		// make a token
		        res.json(token);							// send it
		        console.log('token: ' + token);

                
               
            }    
        });
        
    }
}); //end of create user fcn

router.post('/open/login',passport.authenticate('local',{failureRedirect: '/api/open/login/error'}),(req,res)=>{
    let payload = req.user.toJSON()
	let token = jwt.sign(payload, secret);		// make a token
    res.json(token);
    							// send it
	console.log('token: ' + token);
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
 





