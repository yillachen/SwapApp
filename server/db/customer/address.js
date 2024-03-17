const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('address', {
  address1: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  address2: {
    type: Sequelize.TEXT
  },
  address3: {
    type: Sequelize.TEXT
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM,
    values: ['shipping', 'billing']
  }
})
