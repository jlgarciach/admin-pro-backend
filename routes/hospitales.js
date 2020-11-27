/*
    Hospitales
    RUTA: '/api/hospitales'    
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales')

const router = Router();

router.get( '/', getHospitales);
router.post( '/', 
        [
                validarJWT,
                check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
                validarCampo
        ], 
        crearHospital );

router.put( '/:id', 
        [
                validarJWT,
                check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
                validarCampo
        ], 
        actualizarHospital );

router.delete( '/:id',
        validarJWT,
        borrarHospital );

module.exports = router;