const knex = require('../database/connection');

class Vendedor {

    async novo (cdvend, dsnome, cdtab, dtnasc){
        try {
            await knex.insert({cdvend, dsnome, cdtab, dtnasc}).table('tb_vendedores');
            return {sucesso: 'Usuáurio cadastrado com sucesso'};
        } catch (error){
            return {error: 'Erro ao cadastrar'};
        }
    }

    // visualizar dados do vendedor
    async findAll () {
        try {
            var vendedores = await knex.select(['cdvend', 'dsnome', 'cdtab', 'dtnasc']).table('tb_vendedores')
            return vendedores
        } catch(error) {
            console.log(error)
            return [];
        }
    }

    async findByCdvend (cdvend) {
        try {
            var vendedor = await knex.select(['cdvend', 'dsnome', 'cdtab', 'dtnasc']).where({cdvend: cdvend}).table('tb_vendedores')
            
            if(vendedor.length > 0) {
                return vendedor[0]
            } else {
                return undefined
            }
            
        } catch (error) {
            console.log(error)
            return false
        }
        
    }
    
    async delete (cdvend) {
        var vendedor = await this.findByCdvend(cdvend)

        if(vendedor != undefined) {

            try {
                await knex.delete().where({cdvend: cdvend}).table('tb_vendedores')
                return {status: true}
            } catch (error) {
                return {status: false, error: error}
            }
            
        } else {
            return {status: false, error: 'Usuário não existe, portanto não pode ser deletado.'}
        }
    }

    async update (cdvend, dsnome, cdtab, dtnasc) {
        var vendedor = await this.findByCdvend(cdvend)
    
        if(vendedor != undefined) {
            var vendedorAtualizado = {};
    
            if(dsnome != undefined) {
                vendedorAtualizado.dsnome = dsnome
            }
    
            if(cdtab != undefined) {
                vendedorAtualizado.cdtab = cdtab
            }

            if(dtnasc != undefined) {
                vendedorAtualizado.dtnasc = dtnasc
            }
    
            try {
                await knex.update(vendedorAtualizado).where({cdvend: cdvend}).table('tb_vendedores')
                return {status: true}
            } catch (error) {
                return {status: false, error: error}
            }
    
        } else {
            return {error: 'Não foi possível editar dados, tente mais tarde.'}
        }
    }
    
}

module.exports = new Vendedor()