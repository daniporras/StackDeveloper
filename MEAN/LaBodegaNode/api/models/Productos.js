// Modelo de tienda
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Productos = new Schema({
	nombre : String,
	descripcion : String,
	imagen : String,
	precio : String,
	unidades :String
});

module.exports = mongoose.model('Productos', Productos);