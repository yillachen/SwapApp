const { green, red } = require('chalk');
const { Sequelize } = require('sequelize');
const { db, Product, Customer } = require('./server/db');
const axios = require('axios'); // can also use faker or casual libs to reduce network api calls

const seed = async () => {
  try {
    await db.sync({ force: true }); // wait for the database to connect.

    const fetchFakeProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
      } catch (error) {
        throw new Error(red(error))
      }
    }

    const conditionMap = ['fair', 'good', 'excellent']; // for Product model, to set required attribute `condition`

    const randomPick = array => Math.floor(Math.random() * array.length); // randomizer fn that picks a number from # of items in array.

    // creates customers in db
    const createCustomers = async () => {
      const customersData = [
        {
          username: 'dabernathy',
          firstName: 'Dolores',
          lastName: 'Abernathy',
          email: 'doloresabernathy@westworld.com',
          phone: null,
          profilePhoto:
            'https://quotecatalog.imgix.net/assets/asset-BpymUWoXcLy2amD8tqYtOC4a/original.jpg',
        },
        {
          username: 'maevemillay',
          firstName: 'Maeve',
          lastName: 'Millay',
          email: 'maevemillay@westworld.com',
          phone: null,
          profilePhoto:
            'https://static.wikia.nocookie.net/westworld/images/7/78/Maeves1.jpeg',
        },
        {
          username: 'lowe.bernard',
          firstName: 'Bernard',
          lastName: 'Lowe',
          email: 'bernardlowe@westworld.com',
          phone: null,
          profilePhoto:
            'https://static.wikia.nocookie.net/westworld/images/6/65/Bernard_infobox_new1.jpg',
        },
        {
          username: 'clempennyfeather',
          firstName: 'Clementine',
          lastName: 'Pennyfeather',
          email: 'ClementinePennyfeather@westworld.com',
          profilePhoto:
            'https://static.wikia.nocookie.net/westworld/images/5/55/Clementine_Passed_Pawn.jpg',
          phone: null
        },
        {
          username: 'tedflood',
          firstName: 'Teddy',
          lastName: 'Flood',
          email: 'TeddyFlood@westworld.com',
          profilePhoto:
            'https://static.wikia.nocookie.net/westworld/images/a/a9/Teddy_Flood_Phase_Space.jpg',
          phone: null
        },
        {
          username: 'escaton',
          firstName: 'Hector',
          lastName: 'Escaton',
          email: 'HectorEscaton@westworld.com',
          phone: null
        },
        {
          username: 'hanaryo',
          firstName: 'Hanaryo',
          lastName: 'X',
          email: 'HanaryoX@westworld.com',
          phone: null,
          profilePhoto:
            'https://static.wikia.nocookie.net/westworld/images/7/76/Hanaryo_Akane_No_Mai.jpg',
        }
      ];

      const customers = await Promise.all(customersData.map(data => Customer.create(data)));
      return customers;
    }

    let randomProducts = await fetchFakeProducts();
    const productsMax = 20;
    randomProducts = randomProducts.slice(0, productsMax);

    // creates products in db
    const products = await Promise.all(randomProducts.map(product => {
      const { title, description, category, image } = product;
      return Product.create({
        name: title,
        description,
        condition: conditionMap[randomPick(conditionMap)] || 'good',
        quantity: 1,
        live: true,
        image,
        category
      });
    }));

    // assign random product to random customer
    const assignRandomProduct = async customer => {
      await customer.addProduct(products[randomPick(products)])
    }

    const customers = await createCustomers();
    await Promise.all(customers.map(assignRandomProduct));

  } catch (err) {
    console.error(red('Error in Seed Async FN >> ', err));
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
      console.error(red('Error during seeding'));
      console.error(err);
      db.close();
    });
}
