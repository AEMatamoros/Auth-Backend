const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require('../midlewares/auth')

const authModel = require('../models/auth')
const signToken = (_id)=>{
    return jwt.sign({_id},'miSecreto',{
        expiresIn:60*60*24*365
    });
}
router.post('/reg', (req, res) => {
    const { email, password } = req.body
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64');
        crypto.pbkdf2(password, newSalt, 1000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64')
            authModel.findOne({ email }).exec()
                .then(user => {
                    if (user) {
                        res.send("El usuario ya existe")
                    }
                    authModel.create({
                        email,
                        password:encryptedPassword,
                        salt: newSalt,
                    }).then(() => {
                        res.send("Usuario Registrado con Exito")
                    })
                })
        })


    })

});

router.post('/log', (req, res) => {
    const { email, password } = req.body
    authModel.findOne({ email }).exec()
        .then(user => {
            if (!user) {
                res.send("usuario o contraseña incorrectos");
            }
            crypto.pbkdf2(password, user.salt, 1000, 64, 'sha1', (err, key) => {
                const encryptedPassword = key.toString('base64');
                if(user.password===encryptedPassword){
                    const token = signToken(user._id)
                    return res.send({token})
                }
                res.send("usuario o contraseña incorrectos");
            });
        })
});

router.get('/me',isAuthenticated,(req,res)=>{
    res.send(req.user);
})

module.exports = router