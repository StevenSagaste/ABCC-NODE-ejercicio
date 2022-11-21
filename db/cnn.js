const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost', 
  user: 'root', 
  password: 'adminroot', 
  connectionLimit: 5
});

async function asyncFunction() {
  let conn;
  try {

    conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val");
    console.log(rows);

  } catch (err) {
    console.log(err);
  } finally {
	if (conn) conn.release(); //release to pool
  }
}

module.exports = {
  asyncFunction,
  pool
}