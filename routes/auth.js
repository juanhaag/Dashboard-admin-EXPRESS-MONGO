const router = require('express').Router();

const User = require('../models/User');




//Encriptar contra
const bcrypt = require('bcrypt');
//Joi es un modulo para revisar  los campos que se hayan puesto lo necesario
const Joi = require('@hapi/joi');
const schemaRegister = Joi.object(
    {
        name: Joi.string().min(4).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    }
)
const schemaLogin = Joi.object(
    {
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    }
)

//Json Web Token
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)
     res.header('auth-token', token).json({
        error: null,
        data: { token }
    }) 
    
})


router.post('/register', async (req, res) => {
    const { error } = schemaRegister.validate(req.body);
    if (error) {
        return res.json({
            error: error.details[0]
        })
    }
    const existeEmail = await User.findOne({ email: req.body.email })
    if (existeEmail) {
        return res.status(400).json(
            { error: 'Email ya registrado' }
        )
    }
    //Saltos es cantidad de veces que va a ciclar el hash
    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        //Contra ya hasheada
        password
    })

    try {
        const userDb = await user.save();
        res.json({
            error: null,
            data: userDb
        })
    } catch (error) {
        res.status(400).json(error);
    }
})
 router.get('/login', (req, res) => {
    res.render('login');
}) 

module.exports = router;

