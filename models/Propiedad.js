const string = require('@hapi/joi/lib/types/string')
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
    zona: String,
    superficieTotal:String,
    superficieCubierta:String,
    valor:String,
    tipoVista:String,
    dispocision:String,
    direccion:String,
    dormitorios:String,    
    tipoPropiedad:String,    
    balcon:String,    
    formaPago:String,
    bani:String,    
    ambiente:String,    
    operacio:String,
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