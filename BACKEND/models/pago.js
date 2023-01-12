const {Schema, model } = require('mongoose');

const PagoSchema = Schema({
    codigo: {
        type: String,
        required: [true, 'EL codigo es obligarorio']
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: [true, 'El estudiante es obligatorio']
    },
    mes : {
        type: String,
        enum: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],
        required: [true, 'El mes es obligatorio'],
    },
    anio: {
        type: String,
        required: [true, 'El año es obligatorio'],
    },
    monto: {
        type: Number,
        required: [true, 'El monto es obligatorio'],
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'INCOMPLETO', 'CANCELADO'],
        default: 'PENDIENTE',
        required: [true, 'El estado es obligatorio'],
    },
    observaciones: {
        type: String,
    },

},{ collection: 'pago', timestamps: true, versionKey: false });

module.exports = model('Pago', PagoSchema);