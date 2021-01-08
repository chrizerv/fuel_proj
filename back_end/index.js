const express = require('express');
const bodyParser = require('body-parser');



const app = express();
const PORT = 5000;


app.use(bodyParser.json());

const stationsRoutes = require('./src/routes/stations.route');

app.use('/stations', stationsRoutes);



app.listen(PORT, () => console.log('Server is Running on ' + PORT));





