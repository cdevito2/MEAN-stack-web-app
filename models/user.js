var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create Review schema and model

var UserSchema = new Schema({
   password:{
        type:String,
        required:true,max:30
    },
    email:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }


});

var User = mongoose.model('User',UserSchema);
module.exports = User;