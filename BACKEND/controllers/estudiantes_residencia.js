const { response } = require('express');

const Estudiante = require('../models/estudiante_residencia');

const getEstudiantes = async (req, res = response) => {

    try {

        const estudiantes = await Estudiante.find().populate('grado',
                                'nombre descripcion estado createdAt updatedAt');

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

        const estudiante = await Estudiante.findById(req.params.id).populate('grado',
                            'nombre descripcion estado createdAt updatedAt');

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
    
            const { nombres, apellidos, dni, sexo, correo, celular, fecha_nacimiento, nombre_padres, celular_padres, correo_padres, colegio_procedencia, tipo_estudiante, grado, turno, img, estado } = req.body;
    
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
                nombre_padres,
                celular_padres,
                correo_padres,
                colegio_procedencia,
                tipo_estudiante,
                grado,
                turno,
                img, 
                estado
            }
    
            const estudiante = new Estudiante(data);
    
            await estudiante.save();

            const estudiantes = await Estudiante.find().populate('grado',
                                        'nombre descripcion estado createdAt updatedAt');

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
        const { nombres, apellidos, dni, sexo, correo, celular, domicilio, fecha_nacimiento, nombre_padres, celular_padres, correo_padres, colegio_procedencia, tipo_estudiante, grado, turno, img, estado } = req.body;
    
        const data = {
            nombres, 
            apellidos, 
            dni, 
            sexo,
            correo,
            celular,
            domicilio,
            fecha_nacimiento,
            nombre_padres,
            celular_padres,
            correo_padres,
            colegio_procedencia,
            tipo_estudiante,
            grado,
            turno,
            img, 
            estado
        }

        const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, data, { new: true }).populate('grado',
                                        'nombre descripcion estado createdAt updatedAt');
        
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

const getEstudianteByDni = async (req, res = response) => {

    try {

        const { dni } = req.params;

        const estudiante = await Estudiante.findOne({ dni });
        
        if (!estudiante) {
            return res.status(404).json({
                ok: false,
                msg: 'El estudiante no ha sido encontrado'
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

module.exports = {
    getEstudiantes,
    getEstudiante,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
    getEstudianteByDni,
}