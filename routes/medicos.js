/*
    Medicos
    RUTA: '/api/medicos'    
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos')

const router = Router();

router.get( '/', getMedicos);
router.post( '/', 
        [
                validarJWT,
                check('nombre','El nombre del médico es obligatorio').not().isEmpty(),
                check('hospital','El hospital ID debe ser valido').isMongoId(),
                validarCampo
        ], 
        crearMedico );

router.put( '/:id', 
        [
                validarJWT,
                check('nombre','El nombre del médico es obligatorio').not().isEmpty(),
                check('hospital','El hospital ID debe ser valido').isMongoId(),
                validarCampo   
        ], 
        actualizarMedico );

router.delete( '/:id',
        validarJWT,
        borrarMedico );

module.exports = router;