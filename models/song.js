var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create bear schema and model

var SongSchema = new Schema({
    /*_id: {
        type: String,
        required: true, max:30
    },*/
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
    }

});

var Song = mongoose.model('Song',SongSchema);
module.exports = Song;