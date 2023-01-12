const { Schema, model } = require('mongoose');
/**
 * 

    SEBA: {
        ESTUDIANTES: {
            nombres: string,
            grado: [
                        "inicial 1", "inicial 2"

                        "Intermedio 1", "Intermedio 2", "Intermedio 3"

                        "Avanzado 1", "Avanzado 2", "Avanzado 3", "Avanzado 4"
            ]
        }
    }

    EBR {
        ESTUDIANTES: {
            nombres: string,
            turno: string,
            grado: [
                "1er A", "2do A", "3ero A", "4to A", "5to A",

                "1er B", "2do B", "3ero B", "4to B", "5to B"
            ]
    }

    RESIDENCIA {
        "VICENTA MARIA", "MARIA IMACULADA"
    }

 */


const SeccionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [false, 'La descripcion no es obligatoria'],
    },
    grado: {
        type: Schema.Types.Array,
        ref: 'Seccion',
        required: true,
    },
    estado: {
        type: Boolean,
        default: true,
    },
}, { collection: 'seccion', timestamps: true, versionKey: false });

module.exports = model('Seccion', SeccionSchema);