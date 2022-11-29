const {pool} = require('../db/cnn');

//bigNumberStrings: true,

async function getArticulos() {

    try {

        let conn = await pool.getConnection();
        const res = await conn.query({supportBigNumbers: true, sql:"CALL `mydb2`.get_articulos();"});
        console.log(res);
        conn.end();
        return res
        
    } catch (error) {

       return {msg:'error de consulta -' + error.text}
    }

}

async function getArticulosBySku(sku) {

    try {

        let conn = await pool.getConnection();
        const res = await conn.query("CALL `mydb2`.get_articuloBySku(?);", [sku]);
        // console.log(res);
        conn.end();
        if (res[0].length > 0) {
            let r = res[0].find( e => e.sku === sku);
            console.log(r);
            return r;
        } else return {msg:"Sin resultados"}
        
    } catch (error) {

        return {msg:'error de consulta -' + error.text}
    }

}

async function insertArticulos(sku,articulo,marca,modelo,stock,cantidad,departamento,clase,familia) {

    try {
        let conn = await pool.getConnection();
        const res = await conn.query("CALL `mydb2`.save_articulos(?,?,?,?,?,?,?,?,?)", [
            sku,
            articulo,
            marca,
            modelo,
            stock,
            cantidad,
            departamento,
            clase,
            familia
        ]);
        // const res = await conn.query("INSERT INTO `mydb2`.departamento value (?, ?)", [1, "DOMESTICOS"]);
        console.log(res);
        conn.end();
        return {msg:'guardado con exito', payload: res[0]};
        
    } catch (error) {
        
        return {msg:'error al guardar -' + error.text}

    }

}
async function updateArticulos(sku,articulo,marca,modelo,stock,cantidad,departamento,clase,familia,descontinuado) {

    let fechaBaja;
    let query;
    let arr = [
        articulo,
        marca,
        modelo,
        stock,
        cantidad,
        departamento,
        clase,
        familia,
        descontinuado,
        fechaBaja = new Date(),
        sku
    ];


    if (descontinuado == true) {
        query = "CALL `mydb2`.d_update_articulos(?,?,?,?,?,?,?,?,?,?,?) ";

    }else {
        arr = [articulo,marca,modelo,stock,cantidad,departamento,clase,familia,sku]
        query = "CALL `mydb2`.update_articulos(?,?,?,?,?,?,?,?,?)";
    }

    try {
        let conn = await pool.getConnection();
        const res = await conn.query(query, arr);
        // const res = await conn.query("INSERT INTO `mydb2`.departamento value (?, ?)", [1, "DOMESTICOS"]);
        console.log(res);
        conn.end();
        return {msg:'guardado con exito', payload: res[0]};
        
    } catch (error) {
        
        return {msg:'error al guardar -' + error.text}

    }

}

async function deleteArticulos(sku) {

    try {
        
        let conn = await pool.getConnection();
        const res = await conn.query("CALL `mydb2`.delete_articulos(?);", [sku]);
        console.log(res[0]);
        conn.end();
        return {msg:'eliminado con exito', payload: res[0]};
        
    } catch (error) {
        return {msg:'error al eliminar -' + error.text}
    }

}

async function getDepClsFam(dep,cls,fam) {

    try {
        
        let conn = await pool.getConnection();
        const res = await conn.query("CALL `mydb2`.get_DepClsFam(?,?,?);", [dep,cls,fam]);
        console.log(res[0]);
        conn.end();
        if (res[0].length > 0) {
            let r = res[0]//.find( e => e.departamento === dep );
            console.log(r);
            return r;
        } else return {msg:'Error en el resultado: resultado vacio - uno de los campos llama a un elemento inexistente'};
        
    } catch (error) {
        return {msg:'error al consultar -' + error.text}
    }

}



module.exports = { 
    getArticulos,
    insertArticulos,
    updateArticulos,
    deleteArticulos,
    getArticulosBySku,
    getDepClsFam
}; 