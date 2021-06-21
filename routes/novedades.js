var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel')

/* GET home page. */
router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  res.render('novedades', {
    isNovedades: true,
    novedades
  }); // llamaría a novedades.hbs
});




module.exports = router;