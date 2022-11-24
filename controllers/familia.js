const { request } = require("express");
const { getFamiliasByCls } = require("../models/familia");

const getFamiliaByCls = async (req = request, res) => {

    const { cls } = req.params;

    if (cls > 0 && cls < 99) {
        const familias = await getFamiliasByCls(cls);
        if (familias.length > 0) {
            res.json(familias);
        }
        else {
            res.json({msg:" Sin resultados "});
        }
    } else {
        res.json({msg:" El valor de id es incorrecto "});
    }

}

module.exports = {
    getFamiliaByCls,
}