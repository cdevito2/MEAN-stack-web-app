var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create bear schema and model

var ReviewSchema = new Schema({
   
    /*songId:{
        type:String,
        required:true
    },*/
    songName: {
        type: String, 
        required: true, max: 30
        
    },
    rating: {
	    type: Number,
	    required: true, min:0, max:5
	    
	},
	userWhoReviewed: {
        type: String,
        required: true, max: 30
    },
    reviewComment: {
        type: String,
        required: false
    }

});

var Review = mongoose.model('Review',ReviewSchema);
module.exports = Review;