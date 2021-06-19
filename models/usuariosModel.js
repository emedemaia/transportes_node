//va a trabajar las consultas, como consecuencia tengo que conectarlo al archivo bd.js para consultar la BD
var pool = require('./bd'); //llamando datos de BD
//se controlan internamente, lo requiero a bd.js
var md5 = require('md5');//requiero md5 q es la dependencia para que las contraseñas no se muestren

async function getUserByUsernameAndPassword(user, password) {
    try {
        var query = 'select * from usuarios where usuario = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];

    } catch (error) {

        throw error;
    }
};


// pool.query es algo de la dependencia mysql
module.exports = { getUserByUsernameAndPassword };


