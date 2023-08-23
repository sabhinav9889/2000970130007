const { access } = require('fs');
const mongoose = require('mongoose');
var crypto = require('crypto');

const User = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    ownerName: {
        type:String,
        required:true,
        trim: true,
        min: [3, "minimum username should be at least 3 characters"],
        max: [10, "maximum username should be at most 10 characters"],
        isalphabetic: true,
    },
    rollNo: {
        type:String,
        required:true
    },
    ownerEmail:{
        type:String,
        required:true,
        unique:true
    },
    accessCode:{
        type:String,
        required:true
    },
    hash: String,
    salt: String
});

User.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 

    this.salt = crypto.randomBytes(16).toString('hex'); 

    // Hashing user's salt and password with 1000 iterations, 

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);

};
   
// Method to check the entered password is correct or not 
User.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

const model = new mongoose.model('user', User);

module.exports = model;