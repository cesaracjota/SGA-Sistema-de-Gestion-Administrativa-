const { response } = require('express');

const Estudiante = require('../models/estudiante');

const getEstudiantes = async (req, res = response) => {

    try {

        const estudiantes = await Estudiante.find().populate([
                {
                    path: 'grado', select: 'nombre seccion modalidad turno estado createdAt updatedAt',
                },
                {
                    path: 'apoderado', select: 'nombres apellidos dni sexo relacion_estudiante ocupacion correo telefono celular direccion img estado createdAt updatedAt',
                }
            ]
        );

        res.json(estudiantes);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getEstudiante = async (req, res = response) => {

    try {

        const estudiante = await Estudiante.findById(req.params.id).populate([
            {path: 'apoderado', select: 'nombres apellidos dni sexo relacion_estudiante ocupacion correo telefono celular direccion img estado createdAt updatedAt'},
            {path: 'grado', select: 'nombre seccion modalidad turno estado createdAt updatedAt'}
        ]);

        if (!estudiante) {
            return res.status(404).json({
                ok: false,
                msg: 'Estudiante no encontrado'
            });
        }

        res.json(estudiante);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarEstudiante = async (req, res = response) => {
    
        try {
    
            const { nombres, apellidos, dni, sexo, correo, celular, fecha_nacimiento, apoderado, grado, turno, img, estado } = req.body;
    
            const estudianteDB = await Estudiante.findOne({ dni });
            
            if (estudianteDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El estudiante con ese DNI ya existe'
                });
            }
    
            const data = {
                nombres, 
                apellidos, 
                dni, 
                sexo,
                correo,
                celular,
                fecha_nacimiento,
                apoderado,
                grado,
                turno,
                img, 
                estado
            }
    
            const estudiante = new Estudiante(data);
    
            await estudiante.save();

            const estudiantes = await Estudiante.find().populate([
                {path: 'apoderado', select: 'nombres apellidos dni sexo relacion_estudiante ocupacion correo telefono celular direccion img estado createdAt updatedAt'},
                {path: 'grado', select: 'nombre seccion modalidad turno estado createdAt updatedAt'}
            ]);

            res.status(201).json(estudiantes);
    
        } catch (error) {
    
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarEstudiante = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { nombres, apellidos, dni, sexo, correo, celular, fecha_nacimiento, apoderado, grado, turno, img, estado } = req.body;
    
        const data = {
            nombres, 
            apellidos, 
            dni, 
            sexo,
            correo,
            celular,
            fecha_nacimiento,
            apoderado,
            grado,
            turno,
            img, 
            estado
        }

        const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, data, { new: true }).populate([
            {path: 'apoderado', select: 'nombres apellidos dni sexo relacion_estudiante ocupacion correo telefono celular direccion img estado createdAt updatedAt'},
            {path: 'grado', select: 'nombre seccion modalidad turno estado createdAt updatedAt'}
        ]);
        
        res.json(estudianteActualizado);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarEstudiante = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const estudiante = await Estudiante.findByIdAndDelete(id);

        res.json(estudiante);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getEstudiantes,
    getEstudiante,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
}