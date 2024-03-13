const { db } = require('./server/db');
const app = require('./server');

db.sync().then(() => {
  console.log('database synced');
  app.listen(`1337`, () => console.log(`serving sounds in port 1337.`))
})
