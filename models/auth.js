const mongoose= require('mongoose');

const authSchema = new mongoose.Schema({
    email:String,
    password:String,
    salt:String,
    role:{
        type:String,default:'user'
    }
})

module.exports = mongoose.model('auth',authSchema);