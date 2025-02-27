const { Sequelize } = require('sequelize');
const { development:dbConfig } = require('./config')

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
});

module.exports = sequelize