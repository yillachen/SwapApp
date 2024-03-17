const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('message', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
})
