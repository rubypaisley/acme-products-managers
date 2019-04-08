const Sequelize = require('sequelize');
const db = require('./db');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNUll: false
    }
})

module.exports = Product;
