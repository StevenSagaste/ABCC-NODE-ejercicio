const { request } = require("express");
const { getClasesByDep } = require("../models/clase");


const getClaseByDep = async( req = request, res) => {

    const { dep } = req.params;

    if (dep > 0 && dep < 10) {
        const clases = await getClasesByDep(dep);
        if (clases.length > 0) {
            res.json(clases);
        }
        else {
            res.json({msg:" Sin resultados "});
        }
    } else {
        res.json({msg:" El valor de id es incorrecto "});
    }

}

module.exports = {
    getClaseByDep,
}