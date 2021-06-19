var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');


/* GET home page */

//si necesito un buscador, para listar las novedades puedo usar esto
router.get('/', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario:req.session.nombre, 
        novedades
    });
});

//muestra el formulario para agregar
router.get('/agregar', (req,res,next) =>{ 
    res.render('admin/agregar',{
        layout:'admin/layout'
    });
});

//procesa lo ingresado
router.post('/agregar', async (req,res,next) =>{
try{
    if(req.body.titulo !="" && req.body.subtitulo !="" && req.body.cuerpo !=""){
        await novedadesModel.insertNovedades(req.body);
        res.redirect('/admin/novedades');
    }else{
        res.render('admin/agregar',{
            layout:'admin/layout',
            error:true,
            message:'Todos los campos son requeridos'
        });
    }
}catch(error){
    console.log(error);
    res.render('admin/agregar',{
        layout:'admin/layout',
        error:true,
        message:'No se cargó la novedad'
    });
}
});

//para eliminar

router.get('/eliminar/:id', async(req,res,next)=>{
    var id=req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});




module.exports = router;