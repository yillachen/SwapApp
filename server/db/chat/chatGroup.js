const Sequelize = require('sequelize');
const db = require('../database');

// Sequelize models have native createdAt and updatedAt timestamps

module.exports = db.define('chatGroup', {
  name: {
    type: Sequelize.STRING
  }
})
