const {Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres son obligatorios']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    dni: {
        type: String,
        required: [true, 'El dni es obligatorio']
    },
    sexo: {
        type: String,
        emun: ['M', 'F'],
        default: 'M',
        required: [true, 'El sexo es obligatorio']
    },
    correo: {
        type: String,
        unique: true,
    },
    celular : {
        type: String,
    },
    fecha_nacimiento: {
        type: Date,
    },
    apoderado: {
        type: Schema.Types.ObjectId,
        ref: 'Padres',
        required: false,
    },
    grado: {
        type: Schema.Types.ObjectId,
        ref: 'Grado',
        required: false,
    },
    turno: {
        type: String,
        enum: ['MAÑANA', 'TARDE', 'NORMAL'],
        default: 'NORMAL',
        required: [true, 'El turno es obligatorio'],
    },
    img: {
        type: String,
    },
    observaciones: {
        type: String,
    },
    estado: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO', 'RETIRADO'],
        default: 'ACTIVO',
        required: [true, 'El estado es obligatorio'],
    },
},{ collection: 'estudiante', timestamps: true, versionKey: false });

module.exports = model('Estudiante', EstudianteSchema);