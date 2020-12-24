const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async( req, res  = response ) => {

    const { email, password } = req.body;
    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado!!!'
            });
        }
        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida!!'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            //msg: 'Hola Mundo... auth-controller..'
            token,
            menu: getMenuFrontEnd( usuarioDB.role )
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const googleSignIn = async(req, res =  response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify( googleToken );
        // Verificar si existe el usuario (email)
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if ( !usuarioDB ) { // sino existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                // password: '',
                img: picture,
                google: true
            });
        } else { // si existe, actualiza datos y todo es confiable
            usuario = usuarioDB;
            usuario.google = true;            
        }
        // Guardar en base de datos
        await usuario.save();
        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            token,            
            //msg: 'Google Signin',
            //name, email, picture,
            //googleToken
            menu: getMenuFrontEnd( usuario.role )
        });
    } catch (error) {        
        // res.status(400).json({
        res.status(401).json({
            // ok: true,
            ok: false,
            msg: 'Token invalido!!!'
        });
    }
}

const renewToken = async ( req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UId
    const usuario = await Usuario.findById( uid )

    res.json({
        ok: true,        
        token,
        usuario,
        menu: getMenuFrontEnd( usuario.role )
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}