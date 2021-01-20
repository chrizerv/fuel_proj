import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { useState, useContext } from 'react';
import { axiosInstance } from './axiosInstance';
import { Table, Button } from 'react-bootstrap';
import { MakeAnOrderModal } from './modals/MakeAnOrderModal';
import { UserContext } from './userContext';

export function CustomMarker({ station }) {

  const { userData } = useContext(UserContext);
  const [productsCatalog, setProductsCatalog] = useState(undefined);
  const [makeOrderShow, setMakeOrderShow] = useState(false);


  const handleMakeOrderClose = () => { setMakeOrderShow(false) }
  const handleMakeOrderShow = () => { setMakeOrderShow(true) }


  const getProductsCatalog = async (e) => {


    const catalogRes = await axiosInstance.get("/pricedata/" + station.gasStationID);

    setProductsCatalog(catalogRes.data);

  }


  const icon = L.divIcon({
    iconSize: new L.Point(52, 70),
    html: ReactDOMServer.renderToString
      (<div>
        <img src="fico.ico" width="52" height="52" />
        <p className="text-light bg-dark text-center">{station.minFuelPrice}</p>
      </div>)
  });

  return (
    <Marker
      position={[station.gasStationLat, station.gasStationLong]}
      icon={icon}
      eventHandlers={{
        click: getProductsCatalog
      }}
    >
      <Popup>
        <h2>{station.fuelCompNormalName}</h2>
        <br />
              Owner: {station.gasStationOwner}
        <br />
              Address: {station.gasStationAddress}
        <br />
              Phone: {station.phone1}
        <br />
        <br />

        <Table responsive striped bordered size="sm">
          <thead>
            <tr>
              <th>Fuel</th>
              <th>Price/lt</th>
            </tr>
          </thead>
          <tbody>
            {productsCatalog !== undefined ?
              (
                productsCatalog.map((product) => {
                  return (
                    <tr>
                      <td>{product.fuelName}</td>
                      <td>{product.fuelPrice}</td>
                    </tr>)
                })
              )
              : null
            }
          </tbody>
        </Table>
        {userData.role === 'fuelConsumer' ?
          <Button onClick={handleMakeOrderShow}>Make an order</Button>
          : null}

        {productsCatalog !== undefined ?
          <MakeAnOrderModal show={makeOrderShow} handleClose={handleMakeOrderClose} catalog={productsCatalog} />
          : null}
      </Popup>

    </Marker>
  )

}