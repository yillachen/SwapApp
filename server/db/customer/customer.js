const Sequelize = require('sequelize');
const db = require('../database');

const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/

module.exports = db.define('customer', {
  username: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      validator: (v) => phoneValidationRegex.test(v)
    }
  },
  profilePhoto: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true
    }
  }
})
