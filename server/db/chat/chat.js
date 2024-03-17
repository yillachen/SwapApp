const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('chat', {
  name: {
    type: Sequelize.STRING(25)
  }
})
