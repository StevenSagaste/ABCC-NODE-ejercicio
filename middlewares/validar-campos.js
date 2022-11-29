const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

const validarDepClsFam = (req,res,next) => {
    
    const {dep,cls,fam} = req.body;
    
    if (!dep) {
        return res.json({msg:'Faltan departamento'});
    } else if (!cls) {
        return res.json({msg:'Faltan clase'});
    } else if (!fam) {
        return res.json({msg:'Faltan familia'});
    } else if (dep < 1) {
        return res.json({msg:'El id del departamento no puede ser menor a 1'});
    } else if (dep > 9) {
        return res.json({msg:'El id del departamento solo puede contener un digito'});
    } else if (cls < 1) {
        return res.json({msg:'El id de la clase no puede ser menor a 1'});
    } else if (cls > 99) {
        return res.json({msg:'El id de la clase solo puede contener hasta 2 digitos'});
    } else if (fam < 1) {
        return res.json({msg:'El id de la familia no puede ser menor a 1'});
    } else if (fam > 999) {
        res.json({msg:'El id de la familia solo puede contener hasta 3 digitos'});
    } else next(); 

}

module.exports = {
    validarCampos,
    validarDepClsFam
}