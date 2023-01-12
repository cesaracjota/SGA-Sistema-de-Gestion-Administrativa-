const {Schema, model } = require('mongoose');

const FraseSchema = Schema({
    contenido: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
    },
    autor: {
        type: String,
        required: [true, 'El autor es obligatorio'],
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    },
}, { collection: 'frases', timestamps: true, versionKey: false });

// module.exports = model('Frase', FraseSchema);