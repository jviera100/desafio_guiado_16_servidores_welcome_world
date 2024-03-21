//guardar archivo y ejecutar servidor para que actualice
//ctrl d selecciona mas de un elemento y ctrl shift l selecciona todos lso elementos o codigos
//main enlaces o cdn
//home contenido
//partialts css y bootstraps
//botones recorri el array colores desde home cuando llamas al parcialt botones
//--req.params es parte de la ruta
//--req.query es parte de la consulta que se envia con la ruta.
//const color = req.params.color => forma Acceso directo
//const { color } = req.params; => forma Desestructuración

//--iniciar json => npm init -y => crea json con toda configuracion inicial
//--agrega carpetas modules, json y lock => npm i express o npm install o npm install express --save
//--npm install express@5.0.0-beta.1 --save //ultima actualizacion
//--npm install express express-handlebars
//--npm i bootstrap jquery
//--npm i nodemon => queda como dependencia, no usar, porque lo subiria a internet = remoto
//--npm install -g nodemon => global
//--npm i -D nodemon => lo guarda como dependencia de desarrollo, uso local
//--npm i nodemon --save-dev => lo guarda como dependencia de desarrollo, servidor no las instala, son para desarrollar

//scrip de nodemon lo invoca sin instalarlo, me funciona el script o shortcut
// "scripts": {
//   "server": "node index.js",
//   "server-watch": "node --watch index.js",
//   "server-nodemon": "nodemon index.js",
//   "start": "nodemon --watch index.js"
// },

// "scripts": {
//   "server": "node app3.js || echo 'Error: No se puede iniciar el servidor con node, asegúrate de que app3.js existe.'",
//   "server-watch": "node --watch app3.js || echo 'Error: No se puede iniciar el servidor con watch node, asegúrate de que app3.js existe.'",
//   "server-nodemon": "nodemon app3.js || echo 'Error: No se puede iniciar el servidor con nodemon, asegúrate de que app3.js existe.'",
//   "start": "nodemon --watch app3.js || echo 'Error: No se puede iniciar el servidor con watch nodemon, asegúrate de que app3.js existe.'"
// },

// Requerimiento 0: Crear un servidor con Node en el puerto 3000
//const http = require('http');
//const port = 3000;
//http.createServer((req, res) => {
//  if (req.url == "/inicio" && req.method == "get") {
//    res.end("hola mundo! servidor con node js puro");    //.end no .send
//  }
//})
//.listen(port, () => {                                    //.listen no app.listen
//  console.log(`🔥Servidor corriendo en el puerto🔥http://localhost:${port}`);
//});
// Requerimiento 1: Crear un servidor con Express en el puerto 3000
import express from 'express' //en json debajo de main "type": "module", => asi funciona import = modo nuevo
const express = require('express'); // Importa el módulo Express = modo antiguo
const routes = express.Router
const routes = require('/routes/routes'); //modo antiguo
const app = express(); //instanciar express
const port = process.env.PORT || 3000; //Define el puerto del servidor, usa variable de entorno o 3000 por defecto
const exphbs = require("express-handlebars"); //Importa el motor de plantillas express-handlebars

// Requerimiento 2: Definir la carpeta “assets” como carpeta pública del servidor
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));// extension => Define el motor de plantillas con la extensión .hbs
app.set("view engine", ".hbs");// app => Establece Handlebars como el motor de vistas
app.set("views", "./views");// carpeta vista => Define la carpeta de vistas para las plantillas Handlebars
//use = usa todo lo dentro de la carpeta, ejemplo todas las rutas y con get solo la ruta raiz
app.use(express.static('assets')); //middleware => Define la carpeta 'assets' como estática para servir archivos directamente => en html y css no pones assets, en js si lo pones para ruta archivos.
app.use("/bootstrap_css",express.static('./node_modules/bootstrap/dist/css'));// Sirve los archivos CSS de Bootstrap desde node_modules
app.use("/bootstrap_js",express.static('./node_modules/bootstrap/dist/js'));// Sirve los archivos JS de Bootstrap desde node_modules
app.use("/jquery",express.static('./node_modules/jquery/dist'));// Sirve jQuery desde node_modules

// Requerimiento 3: Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios
const usuarios = ['Juan', 'Jocelyn', 'Astrid', 'Maria', "Ignacia", "Javier", "Brian"]; //arreglo
//ruta raiz
app.get('/', (req, res) => { //req consulta y res respuesta
  res.send('⭐⭐⭐⭐⭐🎉¡Bienvenido a la página de inicio!🎉⭐⭐⭐⭐⭐');
});// Envía un mensaje de bienvenida
// Renderizar la vista con el parcial Dashboard y los datos de los usuarios
app.get('/', (req, res) => { //req consulta y res respuesta
  res.render('home', { // Renderiza la vista 'home' con los datos de los usuarios
    usuarios: ['Juan', 'Jocelyn', 'Astrid', 'Maria', "Ignacia", "Javier", "Brian"] //arreglo
  }) 
});

//ruta devuelve json
app.get('/abracadabra/usuarios', (req, res) => {
  res.json({ usuarios });
});
// Requerimiento 4: Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor. En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario devolver la imagen “who.jpeg”.
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const usuario_ruta = req.params.usuario //aqui capturamos el usuario de la ruta dinamica
  const isUser = usuarios.map((u) => u.toLowerCase()).includes(usuario_ruta.toLowerCase()); //aqui verificamos si el nombre de la ruta esta en el array
//tolowercase es para buscar usuario con mayuscula o minuscula
  isUser ? next() : res.sendFile(__dirname + "/assets/img/who.jpeg");     //captura imagen incognita      
  }); 

app.get('/abracadabra/juego/:usuario', (req, res) => { //ruta devuelve imagen incognita
  res.sendFile(__dirname + '/index.html')              //ruta nombre array devuelve html 
});                            //ejemplo: http://localhost:3000/abracadabra/juego/astrid
// Requerimiento 5: Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.
app.get('/abracadabra/conejo/:n', (req, res) => { 
  const n = req.params.n //aqui capturamos el numero de la ruta dinamica
  const numero = Math.floor(Math.random() * (5 - 1)) + 1; //numero aleatorio
  if (n == numero) {
      res.sendFile(__dirname + '/assets/img/conejito.jpg'); // Devolver imagen del Conejo si coincide
  } else {
    res.sendFile(__dirname + '/assets/img/voldemort.jpg'); // Devolver imagen de Voldemort si no coincide
  }
}); 
//valida nombre
app.get("/usuario/:nombre", (req, res) => {
  // const nombre = req.params.nombre; // Acceso directo
     const { nombre } = req.params; //Desestructuración
     const test = nombre.match(/^[aeiouAEIOU]/)//(^) al principio => expresion regular 
     test                                      
     ? res.send("Si, tu nombre empieza con una vocal")//?=if
     : res.send("No, tu nombre no empieza con una vocal");//:=else
    });
//redirecciona a otra ruta
app.get("/musica", (req, res) => {
  res.redirect("https://www.spotify.com/cl/");
 }); 
//valida color
app.use("/colores/:color", (req, res, next) => {
  const { color } = req.params;
  color == "Azul" ? next() : res.send("No es azúl");
 });
app.get("/colores/:color", (req, res, next) => {
  res.send("Si, es azúl")
});
// Requerimiento 6: Crear una ruta genérica que devuelva un mensaje para rutas no definidas
app.get('*', (req, res) => { //ultima ruta la generica 
  res.send("<center><h1>🤣🤣🤣🤣🤣Esta página no existe...🤣🤣🤣🤣🤣 </h1></center>");
});//windows + . = inserta iconos

// Iniciar el servidor => muestra enlace ruta string e invoca numero de port
app.listen(port, () => { 
  console.log(`🔥🔥🔥🔥🔥Servidor corriendo en el puerto🔥🔥🔥🔥🔥http://localhost:${port}`);
});//levantarmiento servidor

// levanto desde JS
// levanto servidor => node index
// cancelo servidor => ctrl c  => te deja volver a escribir en terminal 

//----levanto desde packageJSON----
//--A)--sin watch (con start): automatizar levantamiento servidor con cancelacion en terminal
//"scripts": {
//  "start": "node index.js"
//},
//--terminal-- => npm start <= --npm nombre_script -- con start no se digita run

//--B)--con watch (con server): automatizar levantamiento servidor automaticamente, sin cancelacion en terminal
//"scripts": {
 // "server": "node --watch index.js"
//},
//--terminal-- => npm run server <= --npm run nombre_script -- con nombre diferente a start si se digita run

//--C)--Con nodemon (con server):
//"scripts": {
//  "server": "nodemon index.js"
//}
//--terminal-- => npm run server <= --npm run nombre_script -- con nombre diferente a start si se digita run

//--D)--Con nodemon y watch (con server):
//"scripts": {
//  "server": "nodemon --watch index.js"
//}
//--terminal-- => npm run server <= --npm run nombre_script -- con nombre diferente a start si se digita run

//----THUNDER CLIENT--
//usar extencion de visual thunder client o postman para usar la url en visual

//----GITIGNORE--
//para ignorar carpeta node_modules para no subir a github en archivo gitignore digitar node_modules/*
