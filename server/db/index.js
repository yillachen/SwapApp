const db = require('./database');
const Customer = require('./customer');
const Product = require('./product');

Customer.belongsToMany(Product, {
  through: 'Customer_Product',
  as: 'products'
});

module.exports = {
  db, Customer
}
