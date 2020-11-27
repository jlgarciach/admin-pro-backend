/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampo
    ],
    login
);

router.post('/google',
    [        
        check('token', 'El Token de Google es obligatorio').not().isEmpty(),
        googleSignIn
    ],
    login
);

router.get('/renew',
    validarJWT,
    renewToken
);
module.exports = router;