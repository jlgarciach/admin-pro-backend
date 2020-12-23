const { response } = require("express");
const Medico = require('../models/medico');

const getMedicos = async( req, res = response ) => {
    const medicos = await Medico.find()
                            .populate('usuario','nombre img')
                            .populate('hospital','nombre img');
    res.json({
        ok: true,
        medicos
        //msg: 'getMedicos'
    });
}

const getMedicoByID = async( req, res = response ) => {
    const id = req.params.id;
    try {
        const medico = await Medico.findById( id )
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');
        res.json({
            ok: true,
            medico
        });        
    } catch (error) {
        console.log(error)
        res.json({            
            ok: true,
            msg: 'Hable con el administrador'
        }); 
    }
}

const crearMedico = async( req, res = response ) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
            //msg: 'crearMedico'
        });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        });
        
    }
}

const actualizarMedico = async( req, res = response ) => {
    const id = req.params.id;
    const uid = req.uid; // viene del Token
    try {
        const medico = await Medico.findById( id );
        if ( !medico ) {
            return res.status(400).json({
                ok: true,
                msg: 'Médico no encontrado por id'
            });
        }
        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        }
        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true} );
        res.json({
            ok: true,
            //msg: 'actualziarMedico',
            medico: medicoActualizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });        
    }
}

const borrarMedico = async( req, res = response ) => {
    const id = req.params.id;
    try {
        const medico = await Medico.findById( id );
        if ( !medico ) {
            return res.status(400).json({
                ok: true,
                msg: 'Médico no encontrado por id'
            });
        }
        // Eliminar Médico de la BDD
        await Medico.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Médico eliminado',
            //medico: medicoActualizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });        
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoByID
}