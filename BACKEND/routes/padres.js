/*
    Ruta: /api/padres
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    getPadres,
    getPadre, 
    registrarPadre, 
    actualizarPadre, 
    eliminarPadre,
} = require('../controllers/padres');

const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getPadres);

router.get('/:id', getPadre);

router.post('/', [
    validarJWT, 
    validarADMIN_ROLE,
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('dni', 'El dni son obligatorios').not().isEmpty(),
    check('sexo', 'El sexo es obligatorio').not().isEmpty(),
    check('relacion_estudiante', 'El relacion_estudiante es obligatorio').not().isEmpty(),
    validarCampos,
] , registrarPadre);

router.put('/:id',[
    validarJWT, 
    validarADMIN_ROLE,
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('dni', 'El dni son obligatorios').not().isEmpty(),
    validarCampos,
], actualizarPadre);

router.delete('/:id' ,
    [
        validarJWT,
        validarADMIN_ROLE,
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos,
    ], eliminarPadre);

module.exports = router;