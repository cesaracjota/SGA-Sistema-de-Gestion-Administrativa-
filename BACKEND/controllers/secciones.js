const { response } = require('express');
const Seccion = require('../models/seccion');

const getSecciones = async (req, res = response) => {
    try {

        const secciones = await Seccion.find();

        res.json(secciones);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getSeccion = async (req, res = response) => {
    try {

        const seccion = await Seccion.findById(req.params.id);

        res.json(seccion);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const crearSeccion = async (req, res = response) => {

    try {

        const nombre = req.body.nombre.toUpperCase();
        const descripcion = req.body.descripcion.toUpperCase();

        const seccionDB = await Seccion.findOne({ nombre });
        if (seccionDB) {
            return res.status(400).json({
                ok: false,
                msg: 'La seccion ya existe'
            });
        }

        const data = {
            nombre,
            descripcion,
        }

        const seccion = new Seccion(data);

        await seccion.save();

        res.status(201).json(seccion);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const actualizarSeccion = async (req, res = response) => {

    try {

        const { nombre, descripcion } = req.body;
        const nuevaSeccion = {
            ...req.body,
            nombre: nombre.toUpperCase(),
            descripcion: descripcion.toUpperCase()
        }

        const seccionActualizado = await Seccion.findByIdAndUpdate(req.params.id, nuevaSeccion, { new: true });

        res.json(seccionActualizado);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarSeccion = async (req, res = response) => {
    try {

        const seccionDB = await Seccion.findOne(req.params._id);

        if (!seccionDB) {
            return res.status(400).json({
                ok: false,
                msg: 'La seccion seleccionada, no existe'
            });
        }

        const { id } = req.params;
        const seccion = await Seccion.findByIdAndDelete(id);
        res.json(seccion);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getSecciones,
    getSeccion,
    crearSeccion,
    actualizarSeccion,
    eliminarSeccion
}