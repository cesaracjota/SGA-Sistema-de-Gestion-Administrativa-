const {Schema, model } = require('mongoose');

const PadresSchema = Schema({
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
    relacion_estudiante: {
        type: String,
        enum: ['PADRE', 'MADRE', 'OTRO'],
        default: 'PADRE',
        required: [true, 'El relacion estudiante es obligatorio']
    },
    ocupacion : {
        type: String,
    },
    correo: {
        type: String,
        unique: true,
    },
    telefono: {
        type: String,
    },
    celular : {
        type: String,
    },
    direccion: {
        type: String,
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    },
},{ collection: 'padres', timestamps: true, versionKey: false });

module.exports = model('Padres', PadresSchema);