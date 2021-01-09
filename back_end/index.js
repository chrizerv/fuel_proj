const express = require('express');
const bodyParser = require('body-parser');



const app = express();
const PORT = 5000;


app.use(bodyParser.json());

const stationsRoutes = require('./src/routes/stations.route');
const pricedataRoutes = require('./src/routes/pricedata.route');

app.use('/stations', stationsRoutes);
app.use('/pricedata', pricedataRoutes);



app.listen(PORT, () => console.log('Server is Running on ' + PORT));





