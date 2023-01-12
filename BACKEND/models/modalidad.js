const { Schema, model } = require('mongoose');

const ModalidadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    slug: {
        type: String,
        required: [true, 'El slug es obligatorio']
    },
    descripcion: {
        type: String,
        required: [false, 'La descripcion no es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
}, { collection: 'modalidad', timestamps: true, versionKey: false });

module.exports = model('Modalidad', ModalidadSchema);