// server.js
'use strict';

const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./DB');
const denominacionesRoute = require('./routes/denominaciones.route');
const cultivosRoute 	  = require('./routes/cultivos.route');
const productoRoute   	  = require('./routes/producto.route');
const ventasRoute		  = require('./routes/ventas.route');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(config.DB, { useNewUrlParser: true,useUnifiedTopology:true }).then(
  () => {console.log('Base de datos: conectada') },
  err => { console.log('No se ha podido conectar a la base de datos: '+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/denominaciones', denominacionesRoute);
app.use('/cultivos', cultivosRoute);
app.use('/productos', productoRoute);
app.use('/ventas', ventasRoute);
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Aplicacion escuchando en: ' + port);
});
