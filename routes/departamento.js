const { Router } = require('express');
const { check } = require('express-validator');

const { getDepartamento, saveDepartamento } = require('../controllers/departamento');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getDepartamento );

router.post('/', saveDepartamento);

module.exports = router;

// router.post('/', [ 
//     // validarJWT,
//     check('cliente','El nombre del cliente es obligatorio').not().isEmpty(),
//     check('cantidad','Se necesita una cantidad').not().isEmpty(),
//     check('producto').custom( existeProductoPorId ),
//     validarCampos
// ], crearPedido );