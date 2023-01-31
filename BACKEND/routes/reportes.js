/*
    Ruta: /api/reportes/ebr || /api/reportes/ceba || /api/reportes/residencia
*/

const { Router } = require('express');

const { 
    reportesEBR,
    reportesCEBA,
    reportesRESIDENCIA
} = require('../controllers/reportes');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/ebr', validarJWT, reportesEBR);
router.get('/ceba', validarJWT, reportesCEBA);
router.get('/residencia', validarJWT, reportesRESIDENCIA);

module.exports = router;