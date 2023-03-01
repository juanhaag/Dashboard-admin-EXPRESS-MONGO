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
        cb(null, `${req.user.id}-${req.body.titulo.replace(/ /g, "").toLowerCase()}.${ext}`)
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
router.post('/', upload.single('image'), async (req, res) => {
    const data = req.body

    try {
        const propiedad = new Propiedad({
            titulo: data.titulo,
            descripcion: data.descripcion,
            inmobiliaria: req.user.id
        })
        console.log(data)
        //Le sacamos los espacios
        await propiedad.setImgUrl(req.file.filename.replace(/ /g, ""))
        await propiedad.save()
        res.redirect(`/api/admin?token=${req.query.token}`)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router