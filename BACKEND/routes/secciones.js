/*
    Ruta: /api/secciones
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getSeccion, 
    getSecciones, 
    crearSeccion,
    actualizarSeccion, 
    eliminarSeccion,
} = require('../controllers/secciones');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getSecciones);

router.get('/:id', getSeccion);

router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
], crearSeccion);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
], actualizarSeccion);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
], eliminarSeccion);

module.exports = router;