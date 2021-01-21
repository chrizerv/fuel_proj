const PriceDataModel = require('../models/pricedata.model');

exports.getStationPriceList = (req, res) => {

  const urlParams = {
    gasStationID: parseInt(req.params.gasStationID)
  }

  if (!(urlParams.hasOwnProperty('gasStationID') &&
    Number.isInteger(urlParams.gasStationID) &&
    urlParams.gasStationID > 0)
  ) {
    res.status(400).send({ message: "Bad url parameters" });
    return;
  }

  PriceDataModel.getByStationID(urlParams.gasStationID, (err, rows) => {

    if (err) {
      console.log('getByStationID error');
      res.status(500).send({ message: "Internal Error" });
    }
    else
      res.status(200).send(rows);
  });

}

exports.changeFuelPrice = (req, res) => {

  const urlParams = {
    productID: parseInt(req.params.productID)
  };
  const bodyParams = req.body;

  if (!(urlParams.hasOwnProperty('productID') &&
    bodyParams.hasOwnProperty('newPrice') &&
    Number.isInteger(urlParams.productID) &&
    !isNaN(bodyParams.newPrice) &&
    urlParams.productID > 0 &&
    bodyParams.newPrice > 0)
  ) {
    res.status(400).send({ message: "Bad url/body parameters" });
    return;
  }

  PriceDataModel.changePrice(urlParams.productID, bodyParams.newPrice, (err, rows) => {

    if (err) {
      console.log('changePrice error');
      res.status(500).send({ message: "Internal Error" });
    }
    else
      res.status(200).send(rows);

  });


}