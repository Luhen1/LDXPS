const Cliente = require('../Models/clienteModel');
const crypto = require('crypto');

class clienteController {
    
    async create (req, res) {
        const cdcl = crypto.randomBytes(8).toString('hex');
        
        var { dsnome, idtipo, cdvend, dslim} = req.body;
        
        //Verificar se os campos foram preenchidos
        if( dsnome == undefined || idtipo == undefined || cdvend == undefined ||dslim == undefined) {
            return res.status(400).json({error: 'Preencha os campos corretamente.'})
        }

        var cliente = await Cliente.novo(cdcl, dsnome, idtipo, cdvend, dslim);
        return res.status(200).json(cliente);
    }

    async index (req, res) {
        //Listar todos os usuários cadastrados
        var cliente = await Cliente.findAll()
        
        if(cliente) {
            res.status(200)
            res.json(cliente)
        } else {
            res.status(400)
            res.json(Cliente.error)
        }
    }

    async findByCdcl (req, res) {

        var cdcl = req.params.cdcl;
        var cliente = await Cliente.findByCdcl(cdcl);

        if(cliente == undefined){
            res.status(404);
            res.json({error: 'Não foi encontrado'})
        } else {
            res.status(200)
            res.json(cliente);
        }
    }

    async delete (req, res){

        var cdcl = req.params.cdcl;
        var cliente = await Cliente.delete(cdcl);

        if(cliente.status){
            res.status(200)
            res.json({sucesso: 'Usuário deletado com sucesso'})
        } else {
            res.status(406)
            res.json({error: "Ocorreu um erro ao deletar."})
        }
    }

    async edit (req, res) {

        var { cdcl, dsnome, idtipo, cdvend, dslim } = req.body

        var cliente = await Cliente.update(cdcl, dsnome, idtipo, cdvend, dslim)

        if(cliente != undefined) {
            if(cliente.status) {
                res.status(200)
                res.json({success: 'Usuário atualizado com sucesso.'})
            } else {
                if (idtipo != 'PF' || 'PJ'){
                    res.json({error: "por favor, insere PF ou PJ"})
                }
                res.status(406)
                res.json({error: 'Erro ao atualizar. Tente novamente mais tarde..'})
            }
        } else {
            res.status(406)
            res.json({error: 'Erro no servidor. Tente novamente mais tarde.'})
        }
    }
}

module.exports = new clienteController()