/*
Usuario1
xF05u7vP75BFxu39
mongodb+srv://AuthUser:<password>@cluster0.tc1so.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/ 
const mongoose = require('mongoose');

const conection= mongoose.connect('mongodb+srv://Usuario1:xF05u7vP75BFxu39@cluster0.tc1so.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})
    .then(res=>console.log("Conectado a authDB"))
    .catch(err=>console.log(err));

module.exports = conection;

