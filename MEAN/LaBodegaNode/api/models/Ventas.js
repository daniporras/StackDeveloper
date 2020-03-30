// Mi modelo para ventas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Ventas = new Schema({
	nombre:String,
	descripcion: String,
	precio:String,
	unidades:String
});

module.exports = mongoose.model('Ventas', Ventas);