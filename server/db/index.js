const db = require('./database');
const Customer = require('./customer/customer');
const Product = require('./product/product');
const Swap = require('./swap/swap');
const ChatGroup = require('./chat/chatGroup');
const Address = require('./customer/address');

// Sequelize Documentation on associations: https://sequelize.org/docs/v6/core-concepts/assocs/

Customer.hasMany(Product);
Product.belongsTo(Customer);

Customer.hasMany(ChatGroup);
ChatGroup.belongsToMany(Customer, {
  through: 'Customer_ChatGroup',
  as: 'chat_groups'
})

Customer.hasMany(Address);
Address.belongsTo(Customer);

// Customer.hasMany(Swap);
// Swap.hasMany(Customer);

module.exports = {
  db, Customer, Product, ChatGroup, Address
  // Swap
}
