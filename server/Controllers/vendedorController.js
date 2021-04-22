const Vendedor = require('../Models/vendedoresModel');
const crypto = require('crypto');

class vendedorController {
    
    async create (req, res) {
        const cdvend = crypto.randomBytes(8).toString('hex');

        var { dsnome, cdtab, dtnasc } = req.body;
        
        //Verificar se os campos foram preenchidos
        if( dsnome == undefined || cdtab == undefined || dtnasc == undefined) {
            return res.status(400).json({error: 'Preencha os campos corretamente.'})
        }

        var vendedor = await Vendedor.novo(cdvend, dsnome, cdtab, dtnasc);
        return res.status(200).json(vendedor);
    }

    async index (req, res) {
        //Listar todos os usuários cadastrados
        var vendedor = await Vendedor.findAll()
        
        if(vendedor) {
            res.status(200)
            res.json(vendedor)
        } else {
            res.status(400)
            res.json(vendedor.error)
        }
    }

    async findByCdvend (req, res) {

        var cdvend = req.params.cdvend;
        var vendedor = await Vendedor.findByCdvend(cdvend);

        if(vendedor == undefined){
            res.status(404);
            res.json({error: 'Não foi encontrado'})
        } else {
            res.status(200)
            res.json(vendedor);
        }
    }

    async delete (req, res){

        var cdvend = req.params.cdvend;
        var vendedor = await Vendedor.delete(cdvend);

        if(vendedor.status){
            res.status(200)
            res.json({sucesso: 'Usuário deletado com sucesso'})
        } else {
            res.status(406)
            res.json({error: "Ocorreu um erro ao deletar."})
        }
    }

    async edit (req, res) {
        //Editar dados do vendedor
        var { cdvend, dsnome, cdtab, dtnasc } = req.body

        var vendedor = await Vendedor.update(cdvend, dsnome, cdtab, dtnasc)

        if(vendedor != undefined) {
            if(vendedor.status) {
                res.status(200)
                res.json({success: 'Usuário atualizado com sucesso.'})
            } else {
                res.status(406)
                res.json({error: 'Erro ao atualizar. Tente novamente mais tarde..'})
            }
        } else {
            res.status(406)
            res.json({error: 'Erro no servidor. Tente novamente mais tarde.'})
        }
    }

}

module.exports = new vendedorController()