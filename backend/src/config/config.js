const fs = require('fs');

module.exports = {
  development: {
    username: 'root',
    password: 'sufi1234',
    database: 'delivery',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: 'root',
    password: 'sufi1234',
    database: 'delivery',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: 'root',
    password: 'sufi1234',
    database: 'delivery',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: {
      bigNumberStrings: true
    }
  }
};