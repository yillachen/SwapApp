const db = require('./database');
const Customer = require('./customer/customer');
const Product = require('./product/product');
const Swap = require('./swap/swap');
const SwapItem = require('./swap/swapItem');
const ChatGroup = require('./chat/chatGroup');
const Chat = require('./chat/chat');
const Message = require('./chat/message');
const Address = require('./customer/address');

// Sequelize Documentation on associations: https://sequelize.org/docs/v6/core-concepts/assocs/

Customer.hasMany(Product);
Product.belongsTo(Customer);

Customer.hasMany(ChatGroup);
ChatGroup.belongsToMany(Customer, {
  through: 'Customer_ChatGroup',
  as: 'chat_groups'
})

ChatGroup.hasOne(Chat);
Chat.belongsTo(ChatGroup);

Chat.hasMany(Message);
Message.belongsToMany(Chat, {
  through: 'Chat_Message',
  as: 'chat_messages'
})

Customer.hasMany(Address);
Address.belongsTo(Customer);

Customer.hasMany(Swap);
Swap.belongsToMany(Customer, {
  through: 'Customer_Swap',
  as: 'swaps'
})

Swap.hasMany(SwapItem);
SwapItem.belongsTo(Swap);

module.exports = {
  db, Customer, Product, ChatGroup, Address, Swap, SwapItem
}
