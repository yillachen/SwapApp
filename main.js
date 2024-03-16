const { db } = require('./server/db');
const app = require('./server');
const port = 1337;

db.sync().then(() => {
  console.log('database synced');
  app.listen(port, () => console.log(`serving sounds in port ${port}.`))
})
