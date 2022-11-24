const { Router } = require('express');
const { check } = require('express-validator');

const { getDepartamento, saveDepartamento } = require('../controllers/departamento');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getDepartamento );

router.post('/', saveDepartamento);

module.exports = router;
