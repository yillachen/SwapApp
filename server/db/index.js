const db = require('./database');
const Customer = require('./customer/customer');
const Product = require('./product/product');
const Swap = require('./swap/swap');
const LineItem = require('./swap/lineItem');
const Chat = require('./chat/chat');
const Message = require('./chat/message');
const Address = require('./customer/address');

// Sequelize Documentation on associations: https://sequelize.org/docs/v6/core-concepts/assocs/

// customer can have many addresses: shipping, billing type
Customer.hasMany(Address);
Address.belongsTo(Customer);

// customer can list many products, but each product belongs to one customer.
Customer.hasMany(Product);
Product.belongsTo(Customer);

// customer can have many chats, and chats can have up to two customers.
Customer.hasMany(Chat);
Chat.belongsToMany(Customer, {
  through: 'Customer_Chat',
  as: 'chats'
})

// chats can have many messages, messages can belong to many different chats
Chat.hasMany(Message);
Message.belongsToMany(Chat, {
  through: 'Chat_Message',
  as: 'chat_messages'
})

// customer can have many swaps open, each swap should have two customers associated
Customer.hasMany(Swap);
Swap.belongsToMany(Customer, {
  through: 'Customer_Swap',
  as: 'swaps'
})

// swaps can have many LineItems, LineItems should belong to one swap at a time.
Swap.hasMany(LineItem);
LineItem.belongsTo(Swap);

// LineItems have a product associate with it, that product should only be associated with one LineItem at a time.
LineItem.hasOne(Product);
Product.belongsTo(LineItem);

module.exports = {
  db, Customer, Product, Chat, Address, Swap, LineItem
}
