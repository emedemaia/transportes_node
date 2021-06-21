var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel')

/* GET home page */
//me hace ingresar
router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout' //busca el layout en admin
    });
});


//me hace logout y volver a la página de login
router.get('/logout', function(req, res, next){
    req.session.destroy();//destruye las variables de sesión definidas en fila 31 y 32
    res.render('admin/login',{
        layout: 'admin/layout'
    });
});


router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario; //me traje la info del usuario desde lo que completa en la página (name=usuario)
        var password = req.body.password;

        var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password); //cuando uso async, en algún lado tengo que usar await. Acá se llama a la función de usuariosModel y utiliza las variables que declaré arriba

        if(data != undefined){//si es diferente de indefinido, o sea que existe ese usuario y contraseña
            req.session.id_usuario = data.id // toma de la query de la tabla de BD
            req.session.nombre = data.usuario // toma el nombre del usuario para después poder imprimirlo


            res.redirect('/admin/novedades');//redirecciona adeterminada página. cuando quiere entrar acá, va a secured y si todo ok sique en novedades
        }else {//si no, sigue
            res.render('admin/login', {
                layout: 'admin/layout', //busca el layout en admin
                error: true //para que le marque el error en la página o puedo poner el mensaje directamente
            });
        }

    } catch (error) {
        console.log(error); //este error se refiere a cuando quizás es un error de servidor
    }

});


module.exports = router; //exporto la función router para que se pueda llamar desde cualquier lado