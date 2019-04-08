const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('./db/index').syncAndSeed;
const { Product, User } = require('./db/index').models;

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', (req, res, next) => {
    Product.findAll({
        include: [{
            model: User,
            as: 'manager'
        }],
        order: [['name', 'ASC']]
    })
        .then((products) => res.send(products))
        .catch(error => console.log('there was an error retrieving data' + error))
})

app.get('/api/users', (req, res, next) => {
    User.findAll({
        include: Product,
        order: [['name', 'ASC']]
    })
        .then((users) => res.send(users))
        .catch(error => console.log('there was an error retrieving data' + error))
})

app.put('/api/products/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => product.update(req.body))
        .then(product => res.send(product))
        .catch(next)
})


syncAndSeed()
    .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))
