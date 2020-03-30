//Modelo de Denominaciones

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UvasSchema = new Schema({
  blanca:Boolean,
  tinta:Boolean,
  rosado:Boolean,
});

let BodegasSchema = new Schema({
  nombre_bodega:String,
  ubicacion_bodega: String,
  telefono_bodega: Number,
  web_bodega: String,
  email_bodega: String,
  uva: [UvasSchema]
});

let Denominaciones = new Schema({
 nombre_denominacion  : String,
  ubicacion_denominacion: String,
  web_denominacion: String,
  bodegas: [BodegasSchema]
});

module.exports = mongoose.model('Denominaciones',Denominaciones);
