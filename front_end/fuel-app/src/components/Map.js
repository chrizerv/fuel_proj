import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { axiosInstance } from './axiosInstance';
import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';


const icon = L.divIcon({
  iconSize: new L.Point(52, 70),
  html: ReactDOMServer.renderToString
    (<div>
      <img src="fico.ico" width="52" height="52" />
      <p className="text-light bg-dark text-center">1.093</p>
    </div>)
});


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

        return (<Marker
          key={station.gasStationID}
          position={[station.gasStationLat, station.gasStationLong]}
          icon={icon}
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