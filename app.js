var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();//cq es un achivo .config?
var session = require('express-session');
//las de abajo son las páginas que creamos en routes. los controladores
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nosotrosRouter = require('./routes/nosotros'); //llamamos a nosotros.js
var serviciosRouter = require('./routes/servicios');
var galeriaRouter = require('./routes/galeria');
var novedadesRouter = require('./routes/novedades');
var contactoRouter = require('./routes/contacto');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'galactoMANANOS97531',
  cookie: { maxAge: null },
  resave: false,
  saveUninitialized: true
}));

secured = async(req,res,next) =>{
  try{
    console.log(req.session.id_usuario); //para probar que me esté trayendo el id del usuario
    if(req.session.id_usuario){
      next();
    }else{
      res.redirect('/admin/login')
    }//cierro else
  }catch(error){
    console.log(error)
  }//cierro catch error
}//cierro secured

//son las páginas ya adentro de views. estoy haciendo que el controlador trabaje en la vista.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/servicios', serviciosRouter);
app.use('/galeria', galeriaRouter);
app.use('/novedades', novedadesRouter);
app.use('/contacto', contactoRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
