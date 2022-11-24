const express = require('express')
const cors = require('cors');

const { dbConnection, db } = require('../db/connection');
const { asyncFunction } = require('../db/cnn');

class Server{
    
    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            articulo: '/api/articulo',
            departamento:'/api/departamento',
            clase: '/api/clase',
            familia: '/api/familia',
        }

        this.ConnectDB();

        this.middlewares();

        this.routes();
    }

    async ConnectDB(){
        // await dbConnection();
        try {

            await asyncFunction();
            console.log('databese: Conexion establecida');

        } catch (error) {
            console.error('DB CNN error:', error);
        }
    }

    middlewares(){

        this.app.use(cors());

        this.app.use( express.json());

        this.app.use( express.static('public'));

    }

    routes(){

        this.app.use(this.paths.articulo, require('../routes/articulo'));
        this.app.use(this.paths.departamento, require('../routes/departamento'));
        this.app.use(this.paths.clase, require('../routes/clase'));
        this.app.use(this.paths.familia, require('../routes/familia'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;