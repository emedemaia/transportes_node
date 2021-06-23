var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');


/* GET home page */

// para listar las novedades o buscar las novedades
router.get('/', async function (req, res, next) {

    var novedades
    console.log(req.query.q);
    if(req.query.q === undefined){
        novedades = await novedadesModel.getNovedades();
    }else{
        novedades = await novedadesModel.buscarNovedades(req.query.q);
    }


    /* esta variable era solo para listar las novedades, como agregué un buscador, tengo que ampliar la variable con if, y es lo que agregué arriba.
    var novedades = await novedadesModel.getNovedades();
    */

    res.render('admin/novedades', { //quiero q me renderice la página novedades, el layout del admin, el nombre de usuario del login y la variable novedades
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades,
        //sin esto de abajo, ya realiza la búsqueda
        is_search: req.query.q !== undefined, //si no encuentra nada podemos poner que diga un mensaje
        q:req.query.q //habilito para que sea un mensaje
    });
});

//Creado para poder dar la opción de ver en orden ascendente y descendente. por defecto es descendente
router.get('/asc', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedadesAsc();
    res.render('admin/novedades', { 
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

//muestra el formulario para agregar
router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

//procesa lo ingresado
router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedades(req.body);
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó la novedad'
        });
    }
});

//para eliminar

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});

//para modificar q me liste una novedad por id

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    })
});


//para UPDATE la novedad

router.post('/modificar', async (req, res, next) => {
    try {
        var obj = { //requerir del body el name titulo, subtitulo, cuerpo id
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
            // id: req.body.id
        }
        await novedadesModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedades');

        console.log(obj);//esto me sirve para chequear que me trae todos los datos

    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó la novedad'
        })
};
});



module.exports = router;