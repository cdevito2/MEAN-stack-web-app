var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create bear schema and model

var AdminPolicySchema = new Schema({
    security: {type: String,required: true},
	privacy: {type: String,required: true},
	dcma: {type: String,required: true},
    copyright: {type: String,required: true},
    created: {type: Date,required: true}

});

var AdminPolicy = mongoose.model('AdminPolicy',AdminPolicySchema);
module.exports = AdminPolicy;