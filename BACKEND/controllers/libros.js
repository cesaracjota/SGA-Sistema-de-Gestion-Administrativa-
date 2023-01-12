const { response } = require('express');
const Libro = require('../models/libro');

const getLibros = async (req, res = response) => {

    try {

        const libros = await Libro.find().populate('grado',
                                                    'nombre descripcion estado createdAt updatedAt');

        res.json({
            ok: true,
            libros
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getLibro = async (req, res = response) => {

    try {

        const libro = await Libro.findById(req.params.id).populate('grado', 
                                                                    'nombre descripcion estado createdAt updatedAt');

        if (!libro) {
            return res.status(404).json({
                ok: false,
                msg: 'Libro no encontrado'
            });
        }

        res.json({
            ok: true,
            libro
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarLibro = async (req, res = response) => {
    
        try {
    
            const { titulo, nombre, descripcion, codigo, editorial, autor, cantidad, grado, img, estado, observaciones } = req.body;
    
            const libroDB = await Libro.findOne({ codigo });
            
            if (libroDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El libro ya existe'
                });
            }
    
            const data = {
                titulo,
                nombre,
                descripcion,
                codigo,
                editorial,
                autor,
                cantidad,
                grado,
                img,
                estado,
                observaciones,
            }
    
            const libro = new Libro(data);
    
            await libro.save();
    
            res.json({
                ok: true,
                msg: 'Libro registrado correctamente',
                libro
            });
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarLibro = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { titulo, nombre, descripcion, codigo, editorial, autor, cantidad, grado, img, estado, observaciones } = req.body;

        const data = {
            titulo,
            nombre,
            descripcion,
            codigo,
            editorial,
            autor,
            cantidad,
            grado,
            img,
            estado,
            observaciones
        }

        const libro = await Libro.findByIdAndUpdate(id, data, { new: true }).populate('grado',
                                                                                        'nombre descripcion estado createdAt updatedAt');

        res.json({
            ok: true,
            msg: 'Libro actualizado correctamente',
            libro
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarLibro = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const libro = await Libro.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'El libro ha sido eliminado correctamente',
            libro
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
    getLibros,
    getLibro,
    registrarLibro,
    actualizarLibro,
    eliminarLibro,
}