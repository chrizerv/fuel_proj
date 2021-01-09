const PriceDataModel = require('../models/pricedata.model');

exports.getStationPriceList = (req, res) => {

 PriceDataModel.getByStationID(req.params.gasStationID, (err, rows) => {

  if (err) {
   console.log('WRONG');
   res.send(err);
  }
  else
   res.status(200).send(rows);
 });

}