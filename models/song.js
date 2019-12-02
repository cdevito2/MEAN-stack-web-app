var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create bear schema and model

var SongSchema = new Schema({
    title: {
        type: String, 
        required: true, max: 30,
        text:true
        
    },
    artist: {
        type: String,
        required: true, max: 30,
        text:true
    },
	album: {
	    type: String , 
	    required: true, max: 30,
	    text:true
    },
    year: {
        type: Number,
        required:true, max : 2019,
        text:true
    },
    track: {
	    type :Number,
        required: true, min: 0, max: 20,
        text:true
    },
    visible: {
        type:Boolean,
        default:true
    },
    genre:{
        type:String,
        requierd:true,
        text:true
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