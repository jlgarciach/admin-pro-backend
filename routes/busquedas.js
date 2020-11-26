/*
    Ruta: api/todo/
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const { getTodo, getDocumentoColecion } = require('../controllers/bosquedas');

const router = Router();

router.get( '/:busqueda', validarJWT, getTodo);
router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentoColecion);

module.exports = router;