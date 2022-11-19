const {Sequelize} = require('sequelize');
const config = require('config')

module.exports = new Sequelize(
    config.get('dbname'),
    config.get('dbuser'),
    config.get('dbpassword'),
    {
        dialect: 'postgres',
        host: config.get('dbhost'),
        port: config.get('dbport')
    }
)