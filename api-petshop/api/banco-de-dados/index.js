const Sequelize = require('sequelize')
//const config = require('configbd')


const instancia = new Sequelize(
    'petshop',
    'root',
    'root',
    {
        host: '127.0.0.1',
        dialect: 'mysql'
    }

)

module.exports = instancia