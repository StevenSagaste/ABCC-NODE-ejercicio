const { Router } = require('express');
const { check } = require('express-validator');

const { getArticulo, saveArticulo, updateArticulo, deleteArticulo, getArticuloBySku} = require('../controllers/articulo');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/all', getArticulo );

router.get('/:sku',[
    check('sku','sku requerido').not().isEmpty(),
    validarCampos
],getArticuloBySku );

router.post('/', saveArticulo);

router.put('/', updateArticulo);

router.delete('/', deleteArticulo);

module.exports = router;