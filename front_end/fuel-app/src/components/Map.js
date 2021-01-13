import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import gasData from "../data/gas_data.json";

export function Map({ fuelType }) {

 return (
  <MapContainer center={[39.638780, 22.415980]} zoom={13} scrollWheelZoom={true}>

   <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />

   {gasData.map((station) => {
    if (station.type === fuelType)
     return (<Marker
      key={station.gasStationID}
      position={[station.gasStationLat, station.gasStationLong]}

     >
      <Popup>
       <h2>{station.fuelCompNormalName}</h2><br /> {station.gasStationOwner}
       <br />
       {station.gasStationAddress}
       <br />
       {fuelType}

      </Popup>

     </Marker>)

   })}


  </MapContainer>
 );
}