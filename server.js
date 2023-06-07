const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const { Category, Product, Tag, ProductTag } = require('./models/index'); //updated path


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// CONNECTION to db and server
sequelize.syncModels({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});