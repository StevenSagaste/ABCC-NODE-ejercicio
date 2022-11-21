const {pool} = require('../db/cnn');

async function getArticulos() {

    let conn = await pool.getConnection();
    const res = await conn.query("CALL `mydb2`.get_articulos();");
    console.log(res[0]);
    conn.end();
    return res[0]

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
        const res = await conn.query("DELETE FROM `mydb2`.articulo WHERE sku=?;", [sku]);
        console.log(res[0]);
        conn.end();
        return {msg:'eliminado con exito', payload: res[0]};
        
    } catch (error) {
        return {msg:'error al eliminar -' + error.text}
    }

}



module.exports = { 
    getArticulos,
    insertArticulos,
    updateArticulos,
    deleteArticulos
}; 