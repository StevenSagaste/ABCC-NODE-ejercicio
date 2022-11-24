const { Router } = require('express');
const { check } = require('express-validator');

const { getClaseByDep } = require('../controllers/clase');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/:dep',[
    check('dep','departamento requerido').not().isEmpty(),
    validarCampos
],getClaseByDep );

// router.post('/', );

module.exports = router;