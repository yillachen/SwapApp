const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT,
  },
  condition: {
    type: Sequelize.ENUM,
    values: ['fair', 'good', 'excellent'],
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  live: { // live item or draft
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
  }
})
