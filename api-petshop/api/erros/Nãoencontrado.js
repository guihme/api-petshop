class NaoEncontrado extends Error {
    constructor () {
        super('Fornecedor não foi encontrado')
        this.name = 'naoEncontrado'
        this.idErro = 0

    }
}

module.exports = NaoEncontrado