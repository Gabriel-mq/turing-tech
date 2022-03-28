//Requires básicos
const express = require("express"),
  path = require("path"),
  app = express(),
  methodOverride = require("method-override"),
  session = require("express-session"),
  cookies = require("cookie-parser");

  //Requires de rutas
  const productRutas = require("./src/routers/productRoute"),
  usersRutas = require("./src/routers/userRoute");
  
  //Require middlewares globales
  const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");

//Carpeta estática de archivos públicos (imágenes,css, etc.)
app.use(express.static(path.resolve(__dirname, "./public")));

//Set up de EJS y su correspondiente carpeta
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views"));

//Métodos "use" para la captura de datos enviados a través del body de un formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Método "override" para la correcta inserción de los procesamientos "put" y "delete"
app.use(methodOverride("_method"));

//Servidor ejecutandose
app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor prendido");
});

//Uso de express-session
app.use(session({
  secret: "Secret Session",
  resave:false,
  saveUninitialized:false
}))

//Uso de cookie-parser
app.use(cookies())

//Uso de middleware de session, es necesario emplearlo posteriormente al uso de express-session
app.use(userLoggedMiddleware)

//Uso de rutas requeridas
app.use("/", productRutas);
app.use("/", usersRutas);

//Not-found
app.use((req, res, next) => {
  res.status(404).render("not-found");
});