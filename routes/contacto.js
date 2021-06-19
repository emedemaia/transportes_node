var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer') // le aviso al archivo que necesita esta dependencia porque voy a enviar un mail. es el encargado de enviar la información.

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto', {
    isContacto:true
  }); // llamaría a ccontacto.hbs
});

// inicia post de formulario

router.post('/', async (req, res, next)=>{

  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.comentarios;

  // console.log(req.body);

  var obj = {
to: 'maiaineselias@gmail.com',
subject: 'Contacto desde la web',
html: nombre + ' se contactó a través de la wb y quiere saber más información y este es su correo ' + email + '<br> Además, hizo el siguiente comentario: ' + mensaje + '<br> Su tel es: '+ tel

  };

var transport = nodemailer.createTransport ({
host: process.env.SMTP_HOST,
port: process.env.SMTP_PORT,
auth:{
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
}

});


var info = await transport.sendMail(obj); //es sólo para poner el await. esta variable puede tener cualquier nombre

res.render('contacto',{
  message: 'mensaje enviado correctamente'
});

}); //cierra post


module.exports = router;