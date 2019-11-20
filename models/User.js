var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
    },
    files:[]
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.models.user || mongoose.model('user', UserSchema);