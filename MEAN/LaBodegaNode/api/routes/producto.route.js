//Routas de Tienda

const express = require('express');
const app = express();
const productosRoutes = express.Router();

let Productos = require('../models/Productos');

//Buscamos todos los productos
productosRoutes.route('/').get(function(req,res){
 Productos.find(function(err,productos){
 if(err){
 console.log(err);
 }else{
 res.json(productos);
 }
 });
});
//Añadimos productos
productosRoutes.route('/add').post(function(req,res){
 let productos = new Productos(req.body);
 productos.save()
 .then(productos => {
  res.status(200).json({'productos': 'producto añadido'});
  })
  .catch(err=>{
  res.status(400).send("ERROR en productos");
  });
});

module.exports=productosRoutes;