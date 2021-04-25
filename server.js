const express= require('express');
var cors = require('cors')

 
const app = express()
require('./controller/db');
//Conf
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({'extended':true}))

//Midlewares
const {isAuthenticated,hasRoles}= require('./midlewares/auth')
//Routes
const authRouter= require('./routes/auth')
//App
app.use('/auth',authRouter);

app.get('/',(req,res)=>{
    res.send('Api Auth Welcome')
})

app.get('/app',isAuthenticated,hasRoles(['user','admin']),(req,res)=>{
    console.log(req.user)
    console.log(req.body)
    res.send("App Welcome")
})

app.listen(process.env.PORT || 8888 ,()=>{
    console.log("El servidor se esta ejecutando en el puerto 8888")
})