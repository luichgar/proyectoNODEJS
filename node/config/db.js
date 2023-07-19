const Sequelize = require('sequelize');

const connection = new Sequelize(
    'airport',
    'root',
    '',
{
    host: 'localhost',
    dialect: 'mysql'
}
);

module.exports = connection;