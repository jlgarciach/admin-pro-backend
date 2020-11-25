/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampo } = require('../middlewares/validar-campos');
const router = Router();


router.post('/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampo
    ],
    login
)

module.exports = router;