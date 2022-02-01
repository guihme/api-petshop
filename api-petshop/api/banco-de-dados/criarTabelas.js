const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedor.js')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)