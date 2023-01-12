/*
    Ruta: /api/modalidades
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getModalidades,
    getModalidad, 
    crearModalidad,
    actualizarModalidad, 
    eliminarModalidad,
} = require('../controllers/modalidades');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getModalidades);

router.get('/:id', getModalidad);

router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
], crearModalidad);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
], actualizarModalidad);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
], eliminarModalidad);

module.exports = router;