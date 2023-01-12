const { response } = require('express');
const Modalidad = require('../models/modalidad');

const getModalidades = async (req, res = response) => {
    try {

        const modalidades = await Modalidad.find();

        res.json(modalidades);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getModalidad = async (req, res = response) => {
    try {

        const modalidad = await Modalidad.findById(req.params.id);

        res.json(modalidad);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const crearModalidad = async (req, res = response) => {

    try {

        const slugify = str => str
                                .toLowerCase()
                                .trim()
                                .replace(/[^\w\s-]/g, '')
                                .replace(/[\s_-]+/g, '-')
                                .replace(/^-+|-+$/g, '');

        const nombre = req.body.nombre.toUpperCase();
        const slug = slugify(req.body.nombre);
        const descripcion = req.body.descripcion.toUpperCase();

        const modalidadDB = await Modalidad.findOne({ nombre });

        if (modalidadDB) {
            return res.status(400).json({
                ok: false,
                msg: 'La modalidad ya existe'
            });
        }

        const data = {
            nombre,
            descripcion,
            slug
        }

        const modalidad = new Modalidad(data);

        await modalidad.save();

        res.status(201).json(modalidad);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const actualizarModalidad = async (req, res = response) => {

    try {

        const slugify = str => str
                                .toLowerCase()
                                .trim()
                                .replace(/[^\w\s-]/g, '')
                                .replace(/[\s_-]+/g, '-')
                                .replace(/^-+|-+$/g, '');

        const { nombre, descripcion } = req.body;
        const slug = slugify(nombre);

        const nuevaModalidad = {
            ...req.body,
            nombre: nombre.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            slug: slug
        }

        const modalidadActualizado = await Modalidad.findByIdAndUpdate(req.params.id, nuevaModalidad, { new: true });

        res.json(modalidadActualizado);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarModalidad = async (req, res = response) => {
    try {

        const modalidadDB = await Modalidad.findOne(req.params._id);

        if (!modalidadDB) {
            return res.status(400).json({
                ok: false,
                msg: 'La modalidad seleccionada, no existe'
            });
        }

        const { id } = req.params;
        const modalidad = await Modalidad.findByIdAndDelete(id);
        res.json(modalidad);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getModalidades,
    getModalidad,
    crearModalidad,
    actualizarModalidad,
    eliminarModalidad
}