const express = require('express');
const app = express();
const denominacionesRoutes = express.Router();

let Denominaciones = require('../models/Denominaciones');

// Devuelve todas las denominaciones
denominacionesRoutes.route('/').get(function(req, res){
 Denominaciones.find(function (err, denominaciones){
 if(err){
    console.log(err);
    res.json(err);
 }else{
    res.json(denominaciones);
 }
 });

});

// Para buscar todos sin repetir
denominacionesRoutes.route('/norepeat').get(function(req, res){
 Denominaciones.distinct('nombre_denominacion',function (err, denominaciones){
 if(err){
  console.log(err);
 }else{
  res.json(denominaciones);
 }
 });
});
// Para la info de una bodega a partir de la denominacion
denominacionesRoutes.route('/denominacion/:nombre').get(function(req,res){
  console.log("Busqueda por denominacion");
  /*console.log(req.params.nombre);*/
  Denominaciones.find({nombre_denominacion: req.params.nombre},function(err, denominaciones){
/*    console.log(denominaciones);*/
    res.json(denominaciones);
  }).catch(err =>{
    res.status(400).send("Error");
  });
});

// Para agrupar
denominacionesRoutes.route('/denominacion/grupo/:nombre').get(function(req,res){
  console.log("Agrupacion");
  console.log(req.params.nombre);
  Denominaciones.aggregate([
    {$match: {}}, {$group:{nombre_bodega: req.params.nombre }
    }
],function(err, denominaciones){
  console.log(denominaciones);
    res.json(denominaciones);
  }).catch(err =>{
    res.status(400).send("Error");
  });
});


denominacionesRoutes.route('/bodega/:denominacion/:bodega').get(function(req,res){
	console.log("llega..");
	let denominacion = req.params.denominacion;
	let bodega = req.params.bodega;
	console.log(denominacion);
	console.log(bodega);
	Denominaciones.find({bodegas:{ $elemMatch: {nombre_bodega: req.params.bodega}}},function(err,denominaciones){
		res.json(denominaciones);
	}).catch(err => {
      res.status(400).send("unable to save to database");
      });
});


// para guardar una denominacion
denominacionesRoutes.route('/add').post(function (req, res) {
    let denominaciones = new Denominaciones(req.body);
    denominaciones.save()
      .then(denominaciones => {
        res.status(200).json({'denominaciones': 'denominaciones in added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      console.log(err);
      });
  });


// para guardar/añadir una bodega concreta

denominacionesRoutes.route('/add/otra').post(function(req,res){
	let bodega = new Denominaciones(req.body);
	bodega.save()
	.then(bodega => {
		res.status(200).json({'denominacion y bodega': 'añadidas'});
	})
	.catch(err=>{
		res.status(400).json({'no se ha podido añadir': 'denominacion y bodegas'});
	});
});


// para actualizar una denominacion
denominacionesRoutes.route('/update/:id').post(function (req, res) {
    Denominaciones.findById(req.params.id, function(err, denominaciones) {
    if (!Denominaciones)
      return next(new Error('Could not load Document'));
    else {
    let denominaciones = new Denominaciones(req.body);
        denominaciones.nombre_bodega = req.body.nombre_bodega;
        denominaciones.ubicacion_bodega = req.body.ubicacion_bodega;
        denominaciones.telefono_bodega = req.body.telefono_bodega;
        denominaciones.web_bodega = req.body.web_bodega;
		denominaciones.email_bodega = req.body.email_bodega;
		
        denominaciones.save().then(denominaciones => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});
// para actualizar una denominacion concreta


denominacionesRoutes.route('/updates/:nombre_bodega').post(function(req, res){
	console.log("Actualiza una bodega de una denominacion");
	
	Denominaciones.findOneAndUpdate(
		{ "bodegas.nombre_bodega":req.params.nombre_bodega},
		{"$set": 
			{
			"bodegas.$.ubicacion_bodega":req.body.ubicacion_bodega,
			"bodegas.$.telefono_bodega":req.body.telefono_bodega,
			"bodegas.$.web_bodega":req.body.web_bodega,
			"bodegas.$.email_bodega":req.body.email_bodega
			}
			},
		//{new: true},
		{upsert: true },
		function(err, denominaciones){
			if(err) res.json(err);
			else res.json('ok');
			}
			);
});
	
// para eliminar una denominacion
denominacionesRoutes.route('/delete/denominacion/:id').get(function (req, res) {
    Denominaciones.findByIdAndRemove({_id: req.params.id}, function(err, denominaciones){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
})

// para eliminar una bodega concreta

denominacionesRoutes.route('/delete/bodega/:id').delete(function (req, res) {
console.log("Borrar bodega: " + req.params.id);
    Denominaciones.findOneAndDelete({"bodegas.nombre_bodega": req.params.id}, function(err, denominaciones){
        if(err){ res.json(err); console.log(err);
        }else res.json('Successfully removed'); console.log("Succesfully removed");
    });
})



module.exports = denominacionesRoutes;
