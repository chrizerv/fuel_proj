import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import gasData from "../data/gas_data.json";
import Axios from 'axios';
import { useEffect, useState } from 'react';

export function Map({ fuelType }) {

  const [gasData, setGasData] = useState([]);

  useEffect(() => {
    console.log('MAP_EFFECT');

    const getGasStations = async () => {
      const gasDataRes = await Axios.get("http://localhost:5000/stations/listandprices/" + fuelType);


      setGasData(gasDataRes.data);

    }

    getGasStations();
  }, [fuelType]);

  console.log('MAPREN');
  return (
    <MapContainer center={[39.638780, 22.415980]} zoom={13} scrollWheelZoom={true}>

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {gasData.map((station) => {

        return (<Marker
          key={station.gasStationID}
          position={[station.gasStationLat, station.gasStationLong]}

        >
          <Popup>
            <h2>{station.fuelCompNormalName}</h2>
            <br />
            Price: {station.minFuelPrice}
            <br />
            Owner: {station.gasStationOwner}
            <br />
            Address: {station.gasStationAddress}
            <br />
            {station.fuelName}

          </Popup>

        </Marker>)

      })}


    </MapContainer>
  );
}