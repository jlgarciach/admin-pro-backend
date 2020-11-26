const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async( req, res = response ) => {
    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre img');
    res.json({
        ok: true,
        hospitales
        //msg: 'getHospitales'
    });
}

const crearHospital = async( req, res = response ) => {
    const uid = req.uid;
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    });
    try {
        const hospitalDB =  await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
            //msg: 'crearHospitales'
        });        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador..'
        });
    }
}

const actualizarHospital = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'actualziarHospitales'
    });
}

const borrarHospital = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}