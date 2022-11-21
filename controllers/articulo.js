const { request, response } = require('express');
const { body } = require('express-validator');
const { getArticulos, insertArticulos, updateArticulos, deleteArticulos, getArticulosBySku } = require('../models/articulo');



const getArticulo = async( req, res) => {
    
    const Articulos = await getArticulos();
    
    res.json(Articulos);
    console.log(Articulos);

}

const getArticuloBySku = async( req = request, res) => {

    const { sku } = req.params;

    if (sku.length === 6) {
        const articulos = await getArticulosBySku(sku);
        if (articulos.length > 0) {
            res.json(articulos);
        }
        else {
            res.json({msg:" Sin resultados "});
        }
    } else if(sku.length > 6) {
        res.json({msg:" El sku es demaciado largo "});
    }
    else {
        res.json({msg:" El sku es demaciado corto "});
    }
    


}

const saveArticulo = async( req, res) => {

    const {sku,articulo,marca,modelo,stock,cantidad,departamento,clase,familia} = req.body
    
    const result = await insertArticulos(sku,articulo,marca,modelo,stock,cantidad,departamento,clase,familia);
    console.log(result);
    res.json(result);

}
const updateArticulo = async( req, res) => {

    const {sku,articulo,marca,modelo,stock,cantidad,departamento,clase,familia,descontinuado} = req.body
    
    const result = await updateArticulos(sku,articulo,marca,modelo,stock,cantidad,departamento,clase,familia,descontinuado);
    console.log(result);
    res.json(result);

}

const deleteArticulo = async( req, res) => {
    
    const {sku} = req.body;

    const result = await deleteArticulos(sku);
    
    res.json(result);
    console.log(result);

}


module.exports = {
    getArticulo,
    saveArticulo,
    updateArticulo,
    deleteArticulo,
    getArticuloBySku
}