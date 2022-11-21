const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true
        })
        .then(console.log("connected to server"))
        .catch((err) => console.log(err));
        
    } catch (error) {
        console.log(error);
        throw new Error('error al conectar base de datos')
    }

    
}

module.exports = {
    dbConnection
}