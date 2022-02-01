const express = require('express')
const bodyParser = require('body-parser')
//const config = require('config')
const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/Nãoencontrado.js')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

const app = express() 

app.use(bodyParser.json())
app.use((req, res, prox) => {
    let formatoRequisitado = req.header('Accept')

    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
        res.status(406)
        res.end()
        return
    }

    resposta.setHeader('Content-Type', formatoRequisitado)

    prox()
})

app.use('/api/fornecedores', roteador)
app.use((erro, req, res, prox) => {

    if (erro instanceof NaoEncontrado) {
        res.status(404)
    }
    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        res.status(400)  
    }
    if (erro instanceof ValorNaoSuportado) {
        res.status(406)
    }
    
    res.send(
        JSON.stringify({
           mensagem: erro.message,
           id: erro.idErro 
        })
    )
})

app.listen(3000, ()=> console.log('A API ESTÁ FUNCIONANDO'))