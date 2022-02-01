const roteador = require('express').Router();
const TabelaFornecedor = require('./tabelaFornecedor.js');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.status(200)
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (req, res, prox) => {
    try{
        const dadosRecebidos = req.body
        const fornercedor = new Fornecedor(dadosRecebidos)
        await fornercedor.criar()
        res.status(201)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serializar(fornercedor)
        )
    } catch(erro) {
        prox(erro)
    }


})

roteador.get('/:id', async (req, res, prox) => {

    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        
        res.status(200)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serializar(fornecedor)
        )
    }catch(erro) {
        prox(erro)
    }
})

roteador.put('/:id', async (req, res, prox) => {

    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornercedor = new Fornecedor(dados)
        await fornercedor.atualizar()
        res.status(204)
        res.end()
    } catch(erro) {
        prox(erro)
    }
})

roteador.delete('/:id', async (req, res, prox) => {

    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(200)
        res.end()

    } catch (erro) {
        prox(erro)
    }
})

module.exports = roteador