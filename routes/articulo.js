const { Router } = require('express');
const { check } = require('express-validator');

const { getArticulo, saveArticulo, updateArticulo, deleteArticulo } = require('../controllers/articulo');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getArticulo );

router.post('/', saveArticulo);

router.put('/', updateArticulo);

router.delete('/', deleteArticulo);

module.exports = router;