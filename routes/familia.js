const { Router } = require('express');
const { check } = require('express-validator');

const { getFamiliaByCls } = require('../controllers/familia');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/:cls',[
    check('cls','Clase requerida').not().isEmpty(),
    validarCampos
],getFamiliaByCls );

// router.post('/', );

module.exports = router;