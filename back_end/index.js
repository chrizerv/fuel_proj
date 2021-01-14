const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const stationsRoutes = require('./src/routes/stations.route');
const pricedataRoutes = require('./src/routes/pricedata.route');
const usersRoutes = require('./src/routes/users.route');
const ordersRoutes = require('./src/routes/orders.route');

app.use('/stations', stationsRoutes);
app.use('/pricedata', pricedataRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);



app.listen(PORT, () => console.log('Server is Running on ' + PORT));





