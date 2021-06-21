var pool = require('./bd');

async function getNovedades() {
    var query = 'select * from novedades order by id desc'
    var rows = await pool.query(query);
    return rows;
}

async function getNovedadesAsc(){
    var query = 'select * from novedades order by id asc'
    var rows = await pool.query(query);
    return rows;
}


async function insertNovedades(obj) {
    try {
        var query = 'insert into novedades set ?';
        var rows = await pool.query(query, [obj]);//como tengo varios, lo pongo en corchetes porque es un array
        return rows;
    } catch (error) {
        console.log(error);
        throw error;

    }
}

async function deleteNovedadById(id){ //éste id es el de la página de novedades
    var query = 'delete from novedades where id =?';
    var rows = await pool.query(query, [id]);
    return rows;
};

//para traer solo una novedad por id
async function getNovedadById(id){
    var query = 'SELECT * from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0]; //me aseguro que traiga una sola
}

//para modificarf la novedad by id

async function modificarNovedadById(obj, id){
    try{
var query = 'update novedades set ? where id = ?';
var rows = await pool.query(query, [obj, id]);
return rows;
    }catch(error){
        throw error;
       
    }
}


module.exports = { getNovedades,  getNovedadesAsc, insertNovedades, deleteNovedadById, getNovedadById, modificarNovedadById  };