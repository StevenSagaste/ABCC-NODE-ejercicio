const {pool} = require('../db/cnn');

async function getFamiliasByCls(cls) {

    try {

        let conn = await pool.getConnection();
        const res = await conn.query("CALL `mydb2`.get_famByClass(?);", [cls]);
        console.log(res[0]);
        conn.end();
        return res[0]
        
    } catch (error) {

        return {msg:'error de consulta -' + error.text}
    }

}

module.exports = {
    getFamiliasByCls,
}