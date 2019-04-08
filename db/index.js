const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./User');
const Product = require('./Product');

Product.belongsTo(User, { as: 'manager', foreignKey: 'manager_id' })
User.hasMany(Product, { foreignKey: 'manager_id' })

const syncAndSeed = () => {
    return db.sync({ force: true })
        .then(() => {
            const users = ['blossom', 'bubbles', 'buttercup'];
            return Promise.all(users.map(name => User.create({ name })))
        })
        .then(() => {
            return Promise.all([
                Product.create({ name: 'foo', manager_id: 1 }),
                Product.create({ name: 'bar', manager_id: 2 }),
                Product.create({ name: 'bazz' })
            ])
        })
        .then(createdProducts => createdProducts.forEach(prod => console.log(prod)))
        .catch(error => console.log('error seeding db ' + error))
}

module.exports = {
    syncAndSeed,
    models: {
        Product,
        User
    }
}