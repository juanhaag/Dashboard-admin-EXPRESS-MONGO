const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
// capturar body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.xhyrvta.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));
//views
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// import routes
const authRoutes = require("./routes/auth");
const adminRoute = require("./routes/admin");
const propieadesRoute = require("./routes/propiedades");
const validarToken = require("./routes/validate-token");

// route middlewares
app.use("/api/user", authRoutes);
app.use("/api/propiedades", propieadesRoute);
app.use("/api/admin", validarToken, adminRoute);

app.get("/", (req, res) => {
  // res.render('register')
  res.json({
    estado: true,
    mensaje: "Utilizar rutas API!",
  });
});

// iniciar server
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
