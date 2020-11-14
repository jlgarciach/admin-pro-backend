const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Mongoose Database OnLine!!')
    } catch ( error ) {
        console.log(error);
        throw new Error('No se pudo conectar a la Base de Datos de Mongoose');
    }

}

module.exports = {
    dbConnection
}