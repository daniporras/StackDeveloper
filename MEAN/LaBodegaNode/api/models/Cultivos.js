//Modelo de Cultivos

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Cultivos = new Schema({
	nombre_cultivo : String,
	descripcion_cultivo: String,
	url_cultivo : String
});

module.exports = mongoose.model('Cultivos', Cultivos);