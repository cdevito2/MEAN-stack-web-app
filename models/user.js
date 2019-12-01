var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create Review schema and model

var UserSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,max:30
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    reviewId:{
        type:[Schema.Types.ObjectId]
    },
    isActive:{
        type:Boolean
    }


});



var User = mongoose.model('User',UserSchema);
module.exports = User;