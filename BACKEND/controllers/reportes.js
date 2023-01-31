const { response } = require('express');
const PagoEBR = require('../models/pago_ebr');
const EstudiantesEBR = require('../models/estudiante_ebr');
const PrestamoLibros = require('../models/prestamo_libros');
const VentaUniformes = require('../models/venta_uniforme');
const PrestamoMapas = require('../models/prestamo_mapas');

const EstudiantesCEBA = require('../models/estudiante_ceba');
const PagoCEBA = require('../models/pago_ceba');

const EstudiantesRESIDENCIA = require('../models/estudiante_residencia');
const PagoRESIDENCIA = require('../models/pago_residencia');

const reportesEBR = async (req, res = response) => {

    try {

        const pagos = await PagoEBR.aggregate([
            {
                $group: {
                    _id: { $sum: 1 },
                    total_registro_pagos: { $sum: 1 },
                    cantidad_pagos_por_anio: { $sum: { $cond: [{ $eq: ["$anio", new Date().getFullYear().toString()] }, 1, 0] } },
                    cantidad_pagos_por_mes: { $sum: { $cond: [{ $eq: ["$meses", [new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date()).toLocaleUpperCase()]] }, 1, 0] } },
                    monto_total_pagos: { $sum: "$monto" },
                    monto_total_pagos_por_anio: { $sum: { $cond: [{ $eq: ["$anio", new Date().getFullYear().toString()] }, "$monto", 0] } },
                    pagos_pendientes: { $sum: { $cond: [{ $eq: ["$estado", "PENDIENTE"] }, 1, 0] } },
                    pagos_incompletos: { $sum: { $cond: [{ $eq: ["$estado", "INCOMPLETO"] }, 1, 0] } },
                    pagos_cancelados: { $sum: { $cond: [{ $eq: ["$estado", "CANCELADO"] }, 1, 0] } },
                    pagos_efectivo: { $sum: { $cond: [{ $eq: ["$metodo_pago", "EFECTIVO"] }, 1, 0] } },
                    pagos_transferencia: { $sum: { $cond: [{ $eq: ["$metodo_pago", "TRANSFERENCIA"] }, 1, 0] } },
                    pagos_deposito: { $sum: { $cond: [{ $eq: ["$metodo_pago", "DEPOSITO"] }, 1, 0] } },
                    pagos_tarjeta: { $sum: { $cond: [{ $eq: ["$metodo_pago", "TARGETA_CREDITO"] }, 1, 0] } },
                    pagos_yape: { $sum: { $cond: [{ $eq: ["$metodo_pago", "YAPE"] }, 1, 0] } },
                    pagos_otro: { $sum: { $cond: [{ $eq: ["$metodo_pago", "OTRO"] }, 1, 0] } },
                }
            }
        ]);

        const estudiantes = await EstudiantesEBR.aggregate([
            {
                $group: {
                    _id: { $sum: 1 },
                    total_estudiantes: { $sum: 1 },
                    estudiantes_masculinos: { $sum: { $cond: [{ $eq: ["$sexo", "M"] }, 1, 0] } },
                    estudiantes_femeninos: { $sum: { $cond: [{ $eq: ["$sexo", "F"] }, 1, 0] } },
                    estudiantes_residencia: { $sum: { $cond: [{ $eq: ["$tipo_estudiante", "RESIDENCIA"] }, 1, 0] } },
                    estudiantes_externa: { $sum: { $cond: [{ $eq: ["$tipo_estudiante", "EXTERNA"] }, 1, 0] } },
                    estudiantes_otro: { $sum: { $cond: [{ $eq: ["$tipo_estudiante", "OTRO"] }, 1, 0] } },
                    turno_manana: { $sum: { $cond: [{ $eq: ["$turno", "MAÑANA"] }, 1, 0] } },
                    turno_tarde: { $sum: { $cond: [{ $eq: ["$turno", "TARDE"] }, 1, 0] } },
                    turno_noche: { $sum: { $cond: [{ $eq: ["$turno", "NOCHE"] }, 1, 0] } },
                    estado_activo: { $sum: { $cond: [{ $eq: ["$estado", "ACTIVO"] }, 1, 0] } },
                    estado_inactivo: { $sum: { $cond: [{ $eq: ["$estado", "INACTIVO"] }, 1, 0] } },
                    estado_egresado: { $sum: { $cond: [{ $eq: ["$estado", "RETIRADO"] }, 1, 0] } },
                },
            }
        ]);

        const prestamo_libros = await PrestamoLibros.aggregate([
            {
                $group: {
                    _id: { $sum: 1 },
                    cantidad_prestamo_libros: { $sum: 1 },
                    libros_prestados: { $sum: { $cond: [{ $eq: ["$estado", "PRESTADO"] }, 1, 0] } },
                    libros_devueltos: { $sum: { $cond: [{ $eq: ["$estado", "DEVUELTO"] }, 1, 0] } },
                }
            }
        ]);

        const prestamo_mapas = await PrestamoMapas.aggregate([
            {
                $group: {
                    _id: { $sum: 1 },
                    cantidad_prestamos: { $sum: 1 },
                    mapas_prestados: { $sum: { $cond: [{ $eq: ["$estado", "PRESTADO"] }, 1, 0] } },
                    mapas_devueltos: { $sum: { $cond: [{ $eq: ["$estado", "DEVUELTO"] }, 1, 0] } },
                }
            }
        ]);

        const venta_uniformes = await VentaUniformes.aggregate([
            {
                $group: {
                    _id: { $sum: 1 },
                    cantidad_uniformes_vendidos: { $sum: 1 },
                    total_venta_uniformes: { $sum: "$monto_pagado" },
                    ultima_venta_uniforme: { $max: "$fecha_venta" },
                    promedio_ventas_uniformes: { $avg: "$monto_pagado" },
                    pagos_pendientes: { $sum: { $cond: [{ $eq: ["$estado", "PENDIENTE"] }, 1, 0] } },
                    pagos_incompletos: { $sum: { $cond: [{ $eq: ["$estado", "INCOMPLETO"] }, 1, 0] } },
                    pagos_cancelados: { $sum: { $cond: [{ $eq: ["$estado", "CANCELADO"] }, 1, 0] } },
                    pagos_efectivo: { $sum: { $cond: [{ $eq: ["$metodo_pago", "EFECTIVO"] }, 1, 0] } },
                    pagos_transferencia: { $sum: { $cond: [{ $eq: ["$metodo_pago", "TRANSFERENCIA"] }, 1, 0] } },
                    pagos_deposito: { $sum: { $cond: [{ $eq: ["$metodo_pago", "DEPOSITO"] }, 1, 0] } },
                    pagos_tarjeta: { $sum: { $cond: [{ $eq: ["$metodo_pago", "TARGETA_CREDITO"] }, 1, 0] } },
                    pagos_yape: { $sum: { $cond: [{ $eq: ["$metodo_pago", "YAPE"] }, 1, 0] } },
                    pagos_otro: { $sum: { $cond: [{ $eq: ["$metodo_pago", "OTRO"] }, 1, 0] } },
                }
            }
        ]);

        res.status(200).json({
            estudiantes,
            pagos,
            prestamo_libros,
            prestamo_mapas,
            venta_uniformes
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const reportesCEBA = async (req, res = response) => {

    try {

        const pagos = await PagoCEBA.aggregate([
            {
                $group: {
                    _id: { $sum: 1 },
                    count: { $sum: 1 },
                    cantidad_pagos_por_anio: { $sum: { $cond: [{ $eq: ["$anio", new Date().getFullYear().toString()] }, 1, 0] } },
                    cantidad_pagos_por_mes: { $sum: { $cond: [{ $eq: ["$meses", [new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date()).toLocaleUpperCase()]] }, 1, 0] } },
                    monto_total_pagos: { $sum: "$monto" },
                    monto_total_pagos_por_anio: { $sum: { $cond: [{ $eq: ["$anio", new Date().getFullYear().toString()] }, "$monto", 0] } },
                    pagos_pendientes: { $sum: { $cond: [{ $eq: ["$estado", "PENDIENTE"] }, 1, 0] } },
                    pagos_incompletos: { $sum: { $cond: [{ $eq: ["$estado", "INCOMPLETO"] }, 1, 0] } },
                    pagos_cancelados: { $sum: { $cond: [{ $eq: ["$estado", "CANCELADO"] }, 1, 0] } },
                    pagos_efectivo: { $sum: { $cond: [{ $eq: ["$metodo_pago", "EFECTIVO"] }, 1, 0] } },
                    pagos_transferencia: { $sum: { $cond: [{ $eq: ["$metodo_pago", "TRANSFERENCIA"] }, 1, 0] } },
                    pagos_deposito: { $sum: { $cond: [{ $eq: ["$metodo_pago", "DEPOSITO"] }, 1, 0] } },
                    pagos_tarjeta: { $sum: { $cond: [{ $eq: ["$metodo_pago", "TARGETA_CREDITO"] }, 1, 0] } },
                    pagos_yape: { $sum: { $cond: [{ $eq: ["$metodo_pago", "YAPE"] }, 1, 0] } },
                    pagos_otro: { $sum: { $cond: [{ $eq: ["$metodo_pago", "OTRO"] }, 1, 0] } },
                }
            }
        ]);

        const estudiantes = await EstudiantesCEBA.aggregate([
            {
                $group: {
                    _id: { $sum: 1 },
                    total_estudiantes: { $sum: 1 },
                    estudiantes_masculinos: { $sum: { $cond: [{ $eq: ["$sexo", "M"] }, 1, 0] } },
                    estudiantes_femeninos: { $sum: { $cond: [{ $eq: ["$sexo", "F"] }, 1, 0] } },
                    estudiantes_residencia: { $sum: { $cond: [{ $eq: ["$tipo_estudiante", "RESIDENCIA"] }, 1, 0] } },
                    estudiantes_externa: { $sum: { $cond: [{ $eq: ["$tipo_estudiante", "EXTERNA"] }, 1, 0] } },
                    estudiantes_ceba: { $sum: { $cond: [{ $eq: ["$tipo_estudiante", "OTRO"] }, 1, 0] } },
                    turno_manana: { $sum: { $cond: [{ $eq: ["$turno", "MAÑANA"] }, 1, 0] } },
                    turno_tarde: { $sum: { $cond: [{ $eq: ["$turno", "TARDE"] }, 1, 0] } },
                    turno_noche: { $sum: { $cond: [{ $eq: ["$turno", "NOCHE"] }, 1, 0] } },
                    estado_activo: { $sum: { $cond: [{ $eq: ["$estado", "ACTIVO"] }, 1, 0] } },
                    estado_inactivo: { $sum: { $cond: [{ $eq: ["$estado", "INACTIVO"] }, 1, 0] } },
                    estado_egresado: { $sum: { $cond: [{ $eq: ["$estado", "RETIRADO"] }, 1, 0] } },
                },
            }
        ]);

        res.status(200).json({
            pagos,
            estudiantes
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const reportesRESIDENCIA = async (req, res = response) => {

    try {

        const pagos = await PagoRESIDENCIA.aggregate([
            {
                $group: {
                    _id: { $sum: 1 },
                    count: { $sum: 1 },
                    cantidad_pagos_por_anio: { $sum: { $cond: [{ $eq: ["$anio", new Date().getFullYear().toString()] }, 1, 0] } },
                    cantidad_pagos_por_mes: { $sum: { $cond: [{ $eq: ["$meses", [new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date()).toLocaleUpperCase()]] }, 1, 0] } },
                    monto_total_pagos: { $sum: "$monto" },
                    monto_total_pagos_por_anio: { $sum: { $cond: [{ $eq: ["$anio", new Date().getFullYear().toString()] }, "$monto", 0] } },
                    pagos_pendientes: { $sum: { $cond: [{ $eq: ["$estado", "PENDIENTE"] }, 1, 0] } },
                    pagos_incompletos: { $sum: { $cond: [{ $eq: ["$estado", "INCOMPLETO"] }, 1, 0] } },
                    pagos_cancelados: { $sum: { $cond: [{ $eq: ["$estado", "CANCELADO"] }, 1, 0] } },
                    pagos_efectivo: { $sum: { $cond: [{ $eq: ["$metodo_pago", "EFECTIVO"] }, 1, 0] } },
                    pagos_transferencia: { $sum: { $cond: [{ $eq: ["$metodo_pago", "TRANSFERENCIA"] }, 1, 0] } },
                    pagos_deposito: { $sum: { $cond: [{ $eq: ["$metodo_pago", "DEPOSITO"] }, 1, 0] } },
                    pagos_tarjeta: { $sum: { $cond: [{ $eq: ["$metodo_pago", "TARGETA_CREDITO"] }, 1, 0] } },
                    pagos_yape: { $sum: { $cond: [{ $eq: ["$metodo_pago", "YAPE"] }, 1, 0] } },
                    pagos_otro: { $sum: { $cond: [{ $eq: ["$metodo_pago", "OTRO"] }, 1, 0] } },
                }
            }
        ]);

        const estudiantes = await EstudiantesRESIDENCIA.aggregate([
            {
                $group: {
                    _id: { $sum: 1 },
                    total_estudiantes: { $sum: 1 },
                    estudiantes_masculinos: { $sum: { $cond: [{ $eq: ["$sexo", "M"] }, 1, 0] } },
                    estudiantes_femeninos: { $sum: { $cond: [{ $eq: ["$sexo", "F"] }, 1, 0] } },
                    estudiantes_residencia: { $sum: { $cond: [{ $eq: ["$tipo_estudiante", "RESIDENCIA"] }, 1, 0] } },
                    estudiantes_externa: { $sum: { $cond: [{ $eq: ["$tipo_estudiante", "EXTERNA"] }, 1, 0] } },
                    estudiantes_ceba: { $sum: { $cond: [{ $eq: ["$tipo_estudiante", "OTRO"] }, 1, 0] } },
                    turno_manana: { $sum: { $cond: [{ $eq: ["$turno", "MAÑANA"] }, 1, 0] } },
                    turno_tarde: { $sum: { $cond: [{ $eq: ["$turno", "TARDE"] }, 1, 0] } },
                    turno_noche: { $sum: { $cond: [{ $eq: ["$turno", "NOCHE"] }, 1, 0] } },
                    estado_activo: { $sum: { $cond: [{ $eq: ["$estado", "ACTIVO"] }, 1, 0] } },
                    estado_inactivo: { $sum: { $cond: [{ $eq: ["$estado", "INACTIVO"] }, 1, 0] } },
                    estado_egresado: { $sum: { $cond: [{ $eq: ["$estado", "RETIRADO"] }, 1, 0] } },
                },
            }
        ]);

        res.status(200).json({
            pagos,
            estudiantes
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    reportesEBR,
    reportesRESIDENCIA,
    reportesCEBA,
}