import "./App.css";
import { Icon } from "leaflet";
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { ActionPanel } from './components/ActionPanel';
import { Map } from './components/Map';

const cat = new Icon({
  iconUrl: "./cat-svgrepo-com.svg",
  iconSize: [50, 50]
});



function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: 'kwstas',
    role: undefined
  });

  useEffect(async () => {
    console.log('EFFECT');
    const tokenRes = await Axios.get("http://localhost:5000/users/info", {
      headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjEiLCJpYXQiOjE2MTAzNjU1NzR9.XeoxRSGIqRS6r7patoTyhPwna_PRPU1WlWXeCK7uYRs" }
    });

    setUserData({
      token: '12',
      user: tokenRes.data.user,
      role: tokenRes.data.role
    })
    /*const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      const tokenRes = await Axios.get("http://localhost:5000/users/info", {
        headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjEiLCJpYXQiOjE2MTAzNjU1NzR9.XeoxRSGIqRS6r7patoTyhPwna_PRPU1WlWXeCK7uYRs" }
      });

      setUserData({
        token: '12',
        user: tokenRes.data.user,
        role: tokenRes.data.role
      })



    }

    checkLoggedIn();
*/
  }, []);

  const [fuelType, setFuelType] = useState("Unleaded 95");


  if (userData.user === 'kwstas') return null;
  else
    return (
      <>
        <div>Welcome <strong>{userData.user}</strong>!</div>
        <ActionPanel setFuelType={setFuelType} />
        <Map fuelType={fuelType} ></Map>
      </>

    );
}

export default App;
