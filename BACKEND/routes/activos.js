/*
    Ruta: /api/activos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getActivos, getActivo, registrarActivo, actualizarActivo, eliminarActivo } = require('../controllers/activos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getActivos);

router.get('/:id', getActivo);

router.post('/', [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo_activo', 'El tipo de activo es obligatorio').not().isEmpty(),
    validarCampos,
], registrarActivo);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo_activo', 'El tipo de activo es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarActivo);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').isMongoId(),
    validarCampos,
], eliminarActivo);

module.exports = router;