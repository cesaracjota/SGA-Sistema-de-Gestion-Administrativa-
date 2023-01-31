const {Schema, model } = require('mongoose');

const PagoSchema = Schema({
    codigo: {
        type: String,
        required: [true, 'EL codigo es obligarorio']
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante_CEBA',
        required: [true, 'El estudiante es obligatorio']
    },
    meses:{
        type: [String],
    },
    anio: {
        type: String,
        required: [true, 'El año es obligatorio'],
    },
    monto: {
        type: Number,
        required: [true, 'El monto es obligatorio'],
    },
    metodo_pago: {
        type: String,
        default: 'EFECTIVO',
    },
    descripcion: {
        type: String,
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

},{ collection: 'pago_ceba', timestamps: true, versionKey: false });

module.exports = model('Pago_CEBA', PagoSchema);