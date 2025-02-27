const { config } = require("dotenv")

config()

const dbConfig = {
  database: process.env.MYSQL_DATABASE ?? 'database',
  username: process.env.MYSQL_USER ?? 'username',
  password: process.env.MYSQL_PASSWORD ?? 'password',
  host: process.env.MYSQL_HOST ?? 'localhost',
  dialect: 'mysql'
}

module.exports = {
  development: dbConfig
}