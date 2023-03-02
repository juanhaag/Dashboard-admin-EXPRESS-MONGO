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
    imagen:Array,
    inmobiliaria: {
        type:String,
        required:true,
        min:4
    },
})

schemaPropiedad.methods.setImgUrl= function setImgUrl(filenames){
    const host = process.env.APP_HOST
    const port = process.env.APP_PORT || 3001
    this.imagen = filenames.map(filename=>`${host}:${port}/img/${filename.filename}`)
}

module.exports = mongoose.model('Propiedad',schemaPropiedad)