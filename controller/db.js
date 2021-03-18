const mongoose = require('mongoose');

const conection= mongoose.connect('mongodb://localhost:27017/authDB',{useNewUrlParser:true, useUnifiedTopology:true})
    .then(res=>console.log("Conectado a authDB"))
    .catch(err=>console.log(err));

module.exports = conection;

