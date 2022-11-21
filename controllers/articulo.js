const { Request, Response } = require('express');
const { getArticulos, insertArticulos, updateArticulos, deleteArticulos } = require('../models/articulo');



const getArticulo = async( req, res) => {
    
    const Articulos = await getArticulos();
    
    res.json(Articulos);
    console.log(Articulos);

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
    deleteArticulo
}