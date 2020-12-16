const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;
    console.log(desde);
    // const usuario = await Usuario
    //                         .find({}, 'nombre email role google')
    //                         .skip(desde)
    //                         .limit( 5 );
    // const total = await Usuario.count();
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit( 5 ),
        //Usuario.count()
        Usuario.countDocuments()
    ]);
    res.json({
        ok: true,
        usuarios,
        total,
        // Esta lína de código puede servir para llevar registro de las peticiones que hace cada usuario 
        //uid: req.uid
    });
}

const crearUsuario = async (req, res = response ) => {
    //console.log(req.body);
    const { password, email } = req.body;
    
    try {
        const existeEmail = await Usuario.findOne({email});
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado...!!!'
            });
        }
        const usuario = new Usuario( req.body );
        // Encriptar contraseña (nmp i bcryptjs)
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
        // Guardar Usuario
        await usuario.save();
        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

const actualizarUsuario = async (req, res = response ) => {
    // TODO: validar token y comprobar si es el usuario correcto
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById( uid );
        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario para ese id'
            });
        }
        // Actualizaciones
        const { password, google, email,  ...campos} = req.body;
        if ( usuarioDB.email !== email ) {            
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo electrónico'
                });
            }
        }
        // Esto se ejecuta y valida que el usuario no sea de google
        if ( !usuarioDB.google ) {campos.email = email;}
        else if ( usuarioDB.email !== email ) {
            return res.status(400).json({
                ok: false,
                msg: '¡¡¡Usuario de google no pueden cambiar su correo'
            });
        }

         const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true } );
        res.json({
           ok: true, 
           //uid
           usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async( req, res = response ) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById( uid );
        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario para ese id'
            });
        }
        await Usuario.findByIdAndDelete( uid );
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}