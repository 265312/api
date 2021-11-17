'use strict';

const repository = require('../repositories/cliente-repository');
const md5 = require('md5');
//buscar
exports.get = async(req, res, next) => {
    const codigo = req.params.id
    console.log(codigo)
    try {
        var data = await repository.get(codigo);
        res.status(200).send(data);
    } catch (e) { 
        res.status(400).send(e);
    }
}
//inserção
exports.post = async(req, res, next) => {
    try {
        if(req.body.USR_EMAIL == ''){
            res.status(400).send({
            message: 'Campo email obrigatório',
            }
            );
        }else{
            var data = await repository.create({
                USR_EMAIL:   req.body.USR_EMAIL   ,
               USR_SENHA:   md5(req.body.USR_SENHA) 
            });
           res.status(201).send({
               message: 'Inserido com sucesso'
           });
        }
        }
       
     catch (e) {
        res.status(400).send({
            message: 'Falha na inserção',
            data: e
        });
    }
}
//update
exports.put = async(req, res, next) => {
    try {
         var data = await repository.put(req.body.USR_ID ,{
            USR_EMAIL:   req.body.USR_EMAIL   ,
            USR_SENHA:   md5(req.body.USR_SENHA) 
         });
        res.status(201).send({
            message: 'Inserido com sucesso'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Falha na inserção',
            data: e
        });
    }
}
exports.delete = async(req, res, next) => {
    try {
         var data = await repository.delete(req.body.USR_ID);
        res.status(201).send({
            message: 'Excluido com sucesso'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Falha na exclusão',
            data: e
        });
    }
}


