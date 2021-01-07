
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./App.css";
import { Icon } from "leaflet";


const skater = new Icon({
  iconUrl: "./1.png",
  iconSize: [25, 25]
});


function App() {





  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
         </Popup>
      </Marker>

      <Marker position={[51.512, -0.09]} icon={skater}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>

  );
}

export default App;
