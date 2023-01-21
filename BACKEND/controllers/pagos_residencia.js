const { response } = require('express');
const Pago = require('../models/pago_residencia');

const getPagos = async (req, res = response) => {

    try {

        const pagos = await Pago.find().populate('estudiante');

        res.json(pagos);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getPago = async (req, res = response) => {

    try {

        const pago = await Pago.findById(req.params.id).populate('estudiante');

        if (!pago) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro de pago no encontrado'
            });
        }

        res.json(pago);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarPago = async (req, res = response) => {
    
        try {
    
            const { codigo, estudiante, meses, anio, monto, metodo_pago, descripcion, estado, observaciones } = req.body;
    
            const pagoDB = await Pago.findOne({ codigo });
            
            if (pagoDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El registro de pago ya existe'
                });
            }
    
            const data = {
                codigo,
                estudiante,
                meses,
                anio,
                monto,
                metodo_pago,
                descripcion,
                estado,
                observaciones,
            }
    
            const pago = new Pago(data);
    
            await pago.save();

            const pagos = await pago.populate('estudiante');
    
            res.json(pagos);
    
        } catch (error) {
    
            console.log(error);

            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

const actualizarPago = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { codigo, estudiante, meses, anio, monto, metodo_pago, descripcion, estado, observaciones } = req.body;

        const data = {
            codigo,
            estudiante,
            meses,
            anio,
            monto,
            metodo_pago,
            descripcion,
            estado,
            observaciones,
        }

        const pago = await Pago.findByIdAndUpdate(id, data, { new: true }).populate('estudiante');

        res.json(pago);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarPago = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const pago = await Pago.findByIdAndDelete(id);

        res.json(pago);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getPagoByEstudiante = async (req, res = response) => {
    try {

        const { id } = req.params;

        const pagos = await Pago.find({ estudiante: id }).populate('estudiante');

        res.json(pagos);

    } catch (error) {
            
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getPagos,
    getPago,
    registrarPago,
    actualizarPago,
    eliminarPago,
    getPagoByEstudiante
}