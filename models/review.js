var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create bear schema and model

var ReviewSchema = new Schema({
   songId: {
        type: Schema.Types.ObjectId, 
        required: true, max: 30,
        ref: 'Song'
    },
    rating: {
	    type: Number,
	    required: true, min:0, max:5
	    
	},
	userId: {
        type: Schema.Types.ObjectId,
        required: true, max: 30,
        ref: 'User'
    },
    reviewComment: {
        type: String,
        required: false
    },
    submittedOn: {
        type:Date,
        requires:true
    }

});

var Review = mongoose.model('Review',ReviewSchema);
module.exports = Review;