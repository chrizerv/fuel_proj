
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./App.css";
import { Icon } from "leaflet";
import gasData from "./data/gas_data.json";
import { useState } from 'react';

const cat = new Icon({
  iconUrl: "./cat-svgrepo-com.svg",
  iconSize: [50, 50]
});

function SelectFuel(props) {
  return (

    <select onChange={(e) => {
      props.setFuelType(e.target.value);
    }}>
      <option value="Unleaded 95">Unleaded 95</option>
      <option value="Unleaded 100">Unleaded 100</option>
      <option value="Diesel">Diesel</option>

    </select>
  );
}


function App() {
  console.log('kati');

  const [fuelType, setFuelType] = useState("");

  return (
    <>
      <div>
        <SelectFuel setFuelType={setFuelType} />
      </div>
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
    </>

  );
}

export default App;
