require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./databse/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();

// console.log(process.env);

// mean_user / dPgdcsQiQNxcuk5X
// Rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`)
})