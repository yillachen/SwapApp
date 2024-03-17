const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('swap', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});
