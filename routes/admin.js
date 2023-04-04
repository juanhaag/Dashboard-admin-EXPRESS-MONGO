const router = require('express').Router();
const Propiedad = require('../models/Propiedad')

//Imagen
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        //obtenemos el utlimo valor despues del punto
        const ext = file.originalname.split('.').pop()
        //Es la ruta filtrada para 1 sola foto
        //cb(null, `${req.user.id}-${req.body.titulo.replace(/ /g, "").toLowerCase()}.${ext}`)
        cb(null, `${req.user.id}-${Date.now()}.${ext}`)
    }
})



router.get('/', async (req, res) => {
    try {
        Propiedad.find({ inmobiliaria: req.user.id }, (err, propiedades) => {
            if (err) {
                console.log(err);
                console.log(propiedades,req.user);
                res.render('admin', { 
                    title: req.user.name,
                    propiedades
                })
            } else {
                console.log(propiedades,req.user);
                res.render('admin', { 
                    title: req.user.name,
                    propiedades
                })
            }
        });
        ;
    } catch (error) {
    }
})

//EDITAR PROPIEDADES
router.get('/:id',async (req,res)=>{
    //le pasamos el path que en el path esta el id de la propieda y lo limpiamos con split 
    const idPropiedad = req.path.split('/')[1];
    const idInmobiliaria = req.user.id;
    console.log('propiedad', idPropiedad , ' id inmo ', idInmobiliaria)
    res.render('prop')
  try {
        const propiedad = await Propiedad.findOne({inmobiliaria:idInmobiliaria },{_id:idPropiedad})
        console.log(propiedad)
    } catch (error) {
        
    } 
})
///SUBIR PROPIEDADES
const upload = multer({ storage });
router.post('/', upload.array('image',10), async (req, res) => {
    const data = req.body
    try {
        const propiedad = new Propiedad({
            titulo: data.titulo,
            descripcion: data.descripcion,
            zona:data["zona-form"],
            superficieTotal:data["superficie-total"],
            superficieCubierta: data["superficie-cubierta"],
            valor:data["valor-form"],
            tipoVista:data["tipo-vista-form"],
            dispocision:data["dispocision-form"],
            direccion:data["direccion-form"],
            dormitorios:data["dormitorios-form"],
            tipoPropiedad:data["tipo-propiedad-form"],
            balcon:data['balcon-form'],
            formaPago:data["forma-pago"],
            banio:data.banio,
            ambientes:data.ambientes,
            operacion:data["tipo-operacion"],
            inmobiliaria: req.user.id
        })
        console.log("data",data);
        //Le sacamos los espacios
        console.log(req.files);
        await propiedad.setImgUrl(req.files)
        //await propiedad.setImgUrl(req.files.filename.replace(/ /g, ""))
        console.log("propiedad",propiedad)
        await propiedad.save()
        res.redirect(`/api/admin?token=${req.query.token}`)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router