import { MapContainer, TileLayer } from 'react-leaflet';

import { axiosInstance } from './axiosInstance';
import { useEffect, useState } from 'react';

import { CustomMarker } from './CustomMarker';



export function Map({ fuelType }) {

  const [gasData, setGasData] = useState([]);

  useEffect(() => {
    console.log('MAP_EFFECT');

    const getGasStations = async () => {
      const gasDataRes = await axiosInstance.get("/stations/listandprices/" + fuelType);


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
        return (
          <CustomMarker key={station.gasStationID} station={station} />
        )
      })
      }


    </MapContainer>
  );
}