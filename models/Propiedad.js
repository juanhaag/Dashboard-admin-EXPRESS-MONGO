const mongoose = require('mongoose')

const schemaPropiedad = mongoose.Schema({
    titulo: {
        type:String,
        required:true,
        min:4
    },
    descripcion: {
        type:String,
        required:true,
        min:4
    },
    imagen:String,
    inmobiliaria: {
        type:String,
        required:true,
        min:4
    },
})

schemaPropiedad.methods.setImgUrl= function setImgUrl(filename){
    const host = process.env.APP_HOST
    const port = process.env.PORT || 3001
    this.imagen = `${host}:${port}/img/${filename}`
}

module.exports = mongoose.model('Propiedad',schemaPropiedad)