/*
    Ruta: /api/pagos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getVentasUniforme,
    getVentaUniforme, 
    registrarVentaUniforme,
    eliminarVentaUniforme,
} = require('../controllers/ventas_uniforme');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getVentasUniforme);

router.get('/:id', getVentaUniforme);

router.post('/', [
    validarJWT, 
    validarADMIN_ROLE,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('estudiante', 'El estudiante es obligatorios').not().isEmpty(),
    check('uniforme', 'El uniforme es obligatorios').not().isEmpty(),
    check('monto_pagado', 'El monto_pagado es obligatorio').not().isEmpty(),
    validarCampos,
] , registrarVentaUniforme);

router.delete('/:id' ,
    [
        validarJWT,
        validarADMIN_ROLE,
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos,
    ], eliminarVentaUniforme);

module.exports = router;