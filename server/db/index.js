const db = require('./database');
const Customer = require('./customer');
const Product = require('./product');

Customer.belongsToMany(Product, {
  through: 'Customer_Product',
  as: 'products'
});

Product.hasOne(Customer, {
  through: 'Product_Customer',
  as: 'customers'
});

module.exports = {
  db, Customer
}
