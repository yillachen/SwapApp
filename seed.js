const { green, red } = require('chalk');
const { Sequelize } = require('sequelize');
const { db, Product, Customer } = require('./server/db');

const seed = async () => {
  try {
    await db.sync({ force: true }); // wait for the database to connect.

    const customers = await Promise.all([
      Customer.create({
        username: 'dabernathy',
        firstName: 'Dolores',
        lastName: 'Abernathy',
        email: 'doloresabernathy@westworld.com',
        phone: null,
        profilePhoto:
        'https://quotecatalog.imgix.net/assets/asset-BpymUWoXcLy2amD8tqYtOC4a/original.jpg',
      }),
      Customer.create({
        username: 'maevemillay',
        firstName: 'Maeve',
        lastName: 'Millay',
        email: 'maevemillay@westworld.com',
        phone: null,
        profilePhoto:
        'https://static.wikia.nocookie.net/westworld/images/7/78/Maeves1.jpeg',
      }),
      Customer.create({
        username: 'lowe.bernard',
        firstName: 'Bernard',
        lastName: 'Lowe',
        email: 'bernardlowe@westworld.com',
        phone: null,
        profilePhoto:
        'https://static.wikia.nocookie.net/westworld/images/6/65/Bernard_infobox_new1.jpg',
      }),
      Customer.create({
        username: 'clempennyfeather',
        firstName: 'Clementine',
        lastName: 'Pennyfeather',
        email: 'ClementinePennyfeather@westworld.com',
        profilePhoto:
        'https://static.wikia.nocookie.net/westworld/images/5/55/Clementine_Passed_Pawn.jpg',
        phone: null
      }),
      Customer.create({
        username: 'tedflood',
        firstName: 'Teddy',
        lastName: 'Flood',
        email: 'TeddyFlood@westworld.com',
        profilePhoto:
        'https://static.wikia.nocookie.net/westworld/images/a/a9/Teddy_Flood_Phase_Space.jpg',
        phone: null
      }),
      Customer.create({
        username: 'escaton',
        firstName: 'Hector',
        lastName: 'Escaton',
        email: 'HectorEscaton@westworld.com',
        phone: null
      }),
      Customer.create({
        username: 'hx',
        firstName: 'Hanaryo',
        lastName: 'X',
        email: 'HanaryoX@westworld.com',
        phone: null,
        profilePhoto:
        'https://static.wikia.nocookie.net/westworld/images/7/76/Hanaryo_Akane_No_Mai.jpg',
      }),
    ]);

    const products = await Promise.all([
      Product.create({
        name: 'HP Printer',
        description: 'Count on OfficeJet Pro, named the most reliable printer brand in its category by leading industry experts.',
        live: true,
        quantity: 6,
        condition: 'fair'
      }),
      Product.create({
        name: 'Wool Blanket',
        description: null,
        live: true,
        quantity: 8,
        condition: 'good'
      }),
      Product.create({
        name: 'Ceramic Teapot',
        description: null,
        live: true,
          quantity: 7,
        condition: 'excellent'
      }),
      Product.create({
        name: 'Ivory Dish',
        description: null,
        live: true,
        quantity: 3,
        condition: 'excellent'
      }),
      Product.create({
        name: 'Kintsugi Bowl',
        description: null,
        live: true,
        quantity: 9,
        condition: 'good'
      })
    ]);

    const [dolores, maeve, bernard, clementine, teddy, hector, hanaryo] = customers;
    const [hpPrinter, woolBlanket, ceramicTeapot, ivoryDish, kintsugiBowl] = products;

    await dolores.addProduct([hpPrinter]); // sequelize magic methods
    await maeve.addProduct([woolBlanket]);
    await clementine.addProduct([ceramicTeapot]);
    await teddy.addProduct([ivoryDish]);
    await hanaryo.addProduct([kintsugiBowl]);

  } catch (err) {
    console.log(red('Error in seed async fn >> ',err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
