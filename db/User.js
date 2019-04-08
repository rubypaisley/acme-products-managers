const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNUll: false
    }
})

module.exports = User;
