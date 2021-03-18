const jwt = require('jsonwebtoken')
const authModel = require('../models/auth')

const isAuthenticated= (req,res,next)=>{//Next ejecuta la siguiente midleware
    const token=req.headers.authorization//Agregar Autorization:token a los headers en la peticion
    
    if(!token){
        return res.sendStatus(403)
    }

    jwt.verify(token,'miSecreto',(err,decoded)=>{
        const {_id}= decoded
        authModel.findOne({_id}).exec()
            .then(user=>{
                //req.user=user
                req.user= {
                    "role": user.role,
                    "_id": user._id,
                    "email": user.email,
                    "__v": 0
                };
                next()
            })
    })
}

const hasRoles = roles => (req,res,next)=>{
    if(roles.indexOf(req.user.role)> -1 ){
       return next
    }
    res.sendStatus(403)
}

module.exports = {
    isAuthenticated,
    hasRoles
}