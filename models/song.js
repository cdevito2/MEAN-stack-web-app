var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create bear schema and model

var SongSchema = new Schema({
    title: {
        type: String, 
        required: true, max: 30
        
    },
    artist: {
        type: String,
        required: true, max: 30
        
    },
	album: {
	    type: String , 
	    required: true, max: 30
	    
    },
    year: {
        type: Number,
        required:true, max : 2019
    },
    track: {
	    type :Number,
	    required: true, min: 0, max: 20
    },
    genre:{
        type:String,
        requierd:true
    },
    copyrightValidation:{
        type:Boolean,
        required:true,
        default:false
    },
    reviewId:{
        type:[Schema.Types.ObjectId],ref:'Review'
    },
   avgRating:{
        type:Number,
        required:false,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    }

});

var Song = mongoose.model('Song',SongSchema);
module.exports = Song;