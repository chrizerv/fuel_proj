import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { useState } from 'react';
import { axiosInstance } from './axiosInstance';

export function CustomMarker({ station }) {

 const [productsCatalog, setProductsCatalog] = useState(undefined);


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
    {station.fuelName}
    {productsCatalog !== undefined ?
     (
      productsCatalog.map((product) => {
       return (
        < >
         {product.fuelName}
         <br />
         {product.fuelPrice}
         <br />
        </>)
      })
     )
     : null
    }

   </Popup>

  </Marker>
 )

}