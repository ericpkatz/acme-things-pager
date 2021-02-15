const config = {
  logging: false
};

if(process.env.LOG === 'true'){
  delete config.logging
}
const Sequelize = require('sequelize');
const { STRING, DECIMAL, BOOLEAN } = Sequelize.DataTypes;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db', config);
const faker = require('faker');

const Thing = conn.define('thing', {
  name: STRING,
  color: STRING,
  price: DECIMAL,
  onSale: BOOLEAN
});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const things = [];
  while(things.length < 1000){
    things.push({
      name: `${faker.commerce.productName()}-${faker.random.number()}`,
      color: faker.commerce.color(),
      price: faker.commerce.price(),
      onSale: faker.random.boolean()
    });
  }
  await Promise.all(things.map( (thing)=> Thing.create(thing)));
};

module.exports = {
  syncAndSeed,
  models: {
    Thing
  }
};
