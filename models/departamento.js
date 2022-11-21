const {pool} = require('../db/cnn');

async function getArticulos() {

    let conn = await pool.getConnection();
    const res = await conn.query("CALL `mydb2`.get_departamentos();");
    console.log(res[0]);
    conn.end();
    return res[0]

}

async function insertArticulos(id,nombre) {

    try {
        let conn = await pool.getConnection();
        const res = await conn.query("CALL `mydb2`.save_departamentos(?,?)", [
            id,
            nombre
        ]);
        // const res = await conn.query("INSERT INTO `mydb2`.departamento value (?, ?)", [1, "DOMESTICOS"]);
        console.log(res);
        conn.end();
        return {msg:'guardado con exito', payload: res[0]};
        
    } catch (error) {
        
        return {msg:'error al guardar -' + error.text}

    }

}

module.exports = { 
    getArticulos,
    insertArticulos,
};