var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel')

/* GET home page. */
router.get('/', async function (req, res, next) {
  var novedades
  console.log(req.query.q);
  if(req.query.q === undefined){
      novedades = await novedadesModel.getNovedades();
  }else{
      novedades = await novedadesModel.buscarNovedades(req.query.q);
  }
  // var novedades = await novedadesModel.getNovedades();
  res.render('novedades', {
    isNovedades: true,
    novedades,
    is_search: req.query.q !== undefined, //si no encuentra nada podemos poner que diga un mensaje
        q:req.query.q 
  }); // llamaría a novedades.hbs
});




module.exports = router;