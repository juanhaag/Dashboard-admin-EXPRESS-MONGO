const mongoose = require('mongoose');

//schemas son el equema de como se va a organizar la info
//Se crea un modelo por collecion de db por ejemplo una para usuario otra para inmobiliara etc
const userScheme = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
})


module.exports = mongoose.model('User', userScheme);