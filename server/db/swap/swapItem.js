const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('swapItem', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'shipped', 'delivered', 'idle'] // status of the product that's being swapped
  }
})
