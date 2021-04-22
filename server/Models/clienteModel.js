const knex = require('../database/connection');

class Cliente {
    
    async novo (cdcl, dsnome, idtipo, cdvend, dslim){
        try {
            await knex.insert({cdcl, dsnome, idtipo, cdvend, dslim}).table('tb_clientes');
            return {sucesso: 'Usuáurio cadastrado com sucesso'};
        } catch (error){
            if (idtipo != 'PF' || 'PJ'){
                return{error: 'Por favor insere somente PF ou PJ'}
            }
            return {error: 'Erro ao cadastrar'};
        }
    }

    async findAll () {
        try {
            var cliente = await knex.select(["cdcl", "dsnome", "idtipo", "cdvend", "dslim"]).table('tb_clientes')   
            return cliente
        } catch(error) {
            console.log(error)
            return [];
        }
    }

    async findByCdcl (cdcl) {
        try {
            var cliente = await knex.select(["cdcl", "dsnome", "idtipo", "cdvend", "dslim"]).where({cdcl: cdcl}).table('tb_clientes')
            
            if(cliente.length > 0) {
                return cliente[0]
            } else {
                return undefined
            }
            
        } catch (error) {
            console.log(error)
            return false
        }        
    }

    async delete (cdcl) {
        var cliente = await this.findByCdcl(cdcl)

        if(cliente != undefined) {

            try {
                await knex.delete().where({cdcl: cdcl}).table('tb_clientes')
                return {status: true}
            } catch (error) {
                return {status: false, error: error}
            }
            
        } else {
            return {status: false, error: 'Usuário não existe, portanto não pode ser deletado.'}
        }
    }

    async update (cdcl, dsnome, idtipo, cdvend, dslim) {
        var cliente = await this.findByCdcl(cdcl)
    
        if(cliente != undefined) {
            var clienteAtualizado = {};
    
            if(dsnome != undefined) {
                clienteAtualizado.dsnome = dsnome
            }
    
            if(idtipo != undefined) {
                clienteAtualizado.idtipo = idtipo
            }

            if(cdvend != undefined) {
                clienteAtualizado.cdvend = cdvend
            }

            if(dslim != undefined) {
                clienteAtualizado.dslim = dslim
            }
    
            try {
                await knex.update(clienteAtualizado).where({cdcl: cdcl}).table('tb_clientes')
                return {status: true}
            } catch (error) {
                return {status: false, error: error}
            }
    
        } else {
            
            return {error: 'Não foi possível editar dados, tente mais tarde.'}
        }
    }
}


module.exports = new Cliente()