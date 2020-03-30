// Rutas para ventas
'use strict';
const express = require('express');
const app     = express();
const ventasRoutes = express.Router();

let Ventas = require('../models/Ventas');

// Devolver toda la coleccion

ventasRoutes.route('/').get(function(req,res){
	Ventas.find(function(err, ventas){
	if(err){
	console.log(err);
	}else{
	res.json(ventas);
	}});
});
// Para añadir
ventasRoutes.route('/add').post(function(req,res){
	let ventas = new Ventas(req.body);
	ventas.save()
	.then(ventas => {
	res.status(200).json({'venta':'venta añadida'});
	})
	.catch(err=>{
	res.status(400).send("Error al añadir la venta");
	});
});

// Para borrar todas las colecciones

ventasRoutes.route('/delete').get(function(req,res){
console.log("Vaciamos!");
	Ventas.deleteMany({}, function(err) {
            if (err) {
                console.log(err)
            } else {
//                res.send('success');
                res.status(200).json({'Success':'Success'});
            }
        }
    );
});



module.exports=ventasRoutes;