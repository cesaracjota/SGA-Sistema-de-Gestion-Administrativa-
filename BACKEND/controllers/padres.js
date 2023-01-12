const { response } = require('express');

const Padres = require('../models/padres');

const getPadres = async (req, res = response) => {

    try {

        const padres = await Padres.find();

        res.json(padres);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getPadre = async (req, res = response) => {

    try {

        const padre = await Padres.findById(req.params.id);

        if (!padre) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrado'
            });
        }

        res.json(padre);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarPadre = async (req, res = response) => {
    
        try {
    
            const { nombres, apellidos, dni, sexo, relacion_estudiante, ocupacion, correo, telefono, celular, direccion, img, estado } = req.body;
    
            const padresDB = await Padres.findOne({ dni });
            
            if (padresDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario con ese DNI ya existe'
                });
            }
    
            const data = {
                nombres, 
                apellidos, 
                dni, 
                sexo, 
                relacion_estudiante, 
                ocupacion, 
                correo, 
                telefono, 
                celular, 
                direccion, 
                img, 
                estado
            }
    
            const padre = new Padres(data);
    
            await padre.save();

            res.status(201).json(padre);
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarPadre = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { nombres, apellidos, dni, sexo, relacion_estudiante, ocupacion, correo, telefono, celular, direccion, img, estado } = req.body;

        const data = {
            nombres, 
            apellidos, 
            dni, 
            sexo, 
            relacion_estudiante, 
            ocupacion, 
            correo, 
            telefono, 
            celular, 
            direccion, 
            img, 
            estado
        }

        const padreActualizado = await Padres.findByIdAndUpdate(id, data, { new: true });

        res.json(padreActualizado);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarPadre = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const padre = await Padres.findByIdAndDelete(id);

        res.json(padre);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getPadres,
    getPadre,
    registrarPadre,
    actualizarPadre,
    eliminarPadre,
}