const { response } = require('express');
const VentaUniforme = require('../models/venta_uniforme');

const getVentasUniforme = async (req, res = response) => {

    try {

        const ventas_uniforme = await VentaUniforme.find().populate(['estudiante', 'uniforme']);

        res.json(ventas_uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getVentaUniforme = async (req, res = response) => {

    try {

        const venta_uniforme = await VentaUniforme.findById(req.params.id).populate(['estudiante', 'uniforme']);

        if (!venta_uniforme) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro de venta_uniforme no encontrado'
            });
        }

        res.json(venta_uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const registrarVentaUniforme = async (req, res = response) => {
    
        try {
    
            const { codigo, estudiante, uniforme, descripcion, monto_pagado, metodo_pago, estado, fecha_venta, observaciones } = req.body;
    
            const venta_uniformeDB = await VentaUniforme.findOne({ codigo });
            
            if (venta_uniformeDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El registro de venta_uniformeDB ya existe'
                });
            }
    
            const data = {
                codigo,
                estudiante,
                uniforme,
                descripcion,
                monto_pagado,
                metodo_pago,
                estado,
                fecha_venta,
                observaciones,
            }
    
            const venta_uniforme = new VentaUniforme(data);
    
            await venta_uniforme.save();

            const ventas_uniforme = await venta_uniforme.populate(['estudiante', 'uniforme']);
    
            res.json(ventas_uniforme);
    
        } catch (error) {
    
            console.log(error);

            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    
        }
    
    }

// const actualizarVentaUniforme = async (req, res = response) => {
//     try {

//         const { id } = req.params;
//         const { codigo, estudiante, mes, anio, monto, estado, observaciones } = req.body;

//         const data = {
//             codigo,
//             estudiante,
//             mes,
//             anio,
//             monto,
//             estado,
//             observaciones,
//         }

//         const pago = await VentaUniforme.findByIdAndUpdate(id, data, { new: true }).populate('estudiante',
//                         'nombres apellidos dni sexo relacion_estudiante ocupacion correo telefono celular direccion img estado createdAt updatedAt');

//         res.json(pago);

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             ok: false,
//             msg: 'Hable con el administrador'
//         });

//     }
// }

const eliminarVentaUniforme = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const venta_uniforme = await VentaUniforme.findByIdAndDelete(id);

        res.json(venta_uniforme);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    getVentasUniforme,
    getVentaUniforme,
    registrarVentaUniforme,
    eliminarVentaUniforme,
}