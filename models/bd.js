var mysql = require('mysql');
var util = require('util');

var pool = mysql.createPool({ //var que me conecta con la BD
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
  
});

pool.query = util.promisify(pool.query); //consultar la variable pool mysql.QueryFunction 
//promisify es una función


module.exports = pool;//con el nombre pool exporto todo este archivo
