const { Request, Response } = require('express');
const { getDepartamentos, insertDepartamentos } = require('../models/departamento');



const getDepartamento = async( req, res) => {

    const departamentos = await getDepartamentos();
    
    res.json(departamentos);
    console.log(departamentos);

}

const saveDepartamento = async( req, res) => {

    const {id, nombre} = req.body;
    
    const result = await insertDepartamentos(id,nombre);
    console.log(result);
    res.json(result);

}

module.exports = {
    getDepartamento,
    saveDepartamento
}