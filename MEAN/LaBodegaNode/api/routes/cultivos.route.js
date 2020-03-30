const express = require('express');
const app = express();
const cultivosRoutes = express.Router();

let Cultivos = require('../models/Cultivos');

// Traer todos los cultivos
cultivosRoutes.route('/').get(function(req, res){
 Cultivos.find(function(err, cultivos){
 if(err){
 console.log(err);
 }else{
 res.json(cultivos);
 }
 });
});

// Añadir un cultivo
cultivosRoutes.route('/add').post(function(req, res){
	let cultivos = new Cultivos(req.body);
	console.log(req.body);
	cultivos.save()
		.then(cultivos =>{
		res.status(200).json({'cultivo': 'añadido correctamente'});
		})
		.catch(err=>{
		res.status(400).send('No ha sido posible');
		})
});

module.exports = cultivosRoutes;