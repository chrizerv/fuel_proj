
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./App.css";
import { Icon } from "leaflet";
import gasData from "./data/gas_data.json";
import { useEffect, useState } from 'react';
import Axios from 'axios';

const cat = new Icon({
  iconUrl: "./cat-svgrepo-com.svg",
  iconSize: [50, 50]
});

function ActionPanel(props) {
  return (
    <>
      <select onChange={(e) => {
        props.setFuelType(e.target.value);
      }}>
        <option value="Unleaded 95">Unleaded 95</option>
        <option value="Unleaded 100">Unleaded 100</option>
        <option value="Diesel">Diesel</option>
      </select>
      <strong> Gas Stations:</strong>
      <span>12</span>
      <strong>  min:</strong>
      <span>1.4</span>
      <strong>  avg:</strong>
      <span>1.4</span>
      <strong>  max:</strong>
      <span>1.4</span>
      <button>My Orders</button>
      <button>My Products</button>
      <button>Log in</button>
      <button>Log out</button>
    </>

  );
}


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    role: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      try {
        const tokenRes = await Axios.get("http://localhost:5000/users/info", {
          headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjEiLCJpYXQiOjE2MTAzNjU1NzR9.XeoxRSGIqRS6r7patoTyhPwna_PRPU1WlWXeCK7uYRs" }
        });
        console.log(tokenRes.data);
      } catch (err) { }

    }

    checkLoggedIn();

  }, []);



  const [fuelType, setFuelType] = useState("");

  return (
    <>

      <ActionPanel setFuelType={setFuelType} />

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
