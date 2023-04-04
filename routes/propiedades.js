const router = require("express").Router();
const Propiedad = require("../models/Propiedad");
router.get("/", async (req, res) => {
  const id = req.query.inmo;
  console.log(id);
  try {
    Propiedad.find({ inmobiliaria: id }, (err, propiedades) => {
      if (err) {
        console.log(err);
        console.log(propiedades, req.user);
        res.send(propiedades);
      } else {
        console.log(propiedades, req.user);
        res.send(propiedades);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
