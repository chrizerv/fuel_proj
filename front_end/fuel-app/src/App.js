import logo, { ReactComponent } from './logo.svg';
import './App.css';
import {GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';


function Map(){
  return (
    <GoogleMap  defaultZoom={10} defaultCenter={{lat:39.074207, lng:21.824312}} />
  );
}


const WrappedMap = withScriptjs( withGoogleMap(Map) );

function App() {
  return (
    <div style={{width : '100vw', height: '100vh'}} >

      <WrappedMap 
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBpnMGEp2wU9Ghe2FTFphqlEf3xijvtZF4"
        loadingElement={<div style={{height:"100%"}}/>}
        containerElement={<div style={{height:"100%"}}/>}
        mapElement={<div style={{height:"100%"}}/>}
      />
    </div>
    
  );
}

export default App;
