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

Axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    //place your reentry code
    return "Unauthenticated"
  }
  return "WRONG";
});


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: 'kwstas',
    role: undefined
  });

  useEffect(() => {
    console.log('EFFECT');

    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }


      const tokenRes = await Axios.get("http://localhost:5000/users/info", {
        headers: { "Authorization": "Bearer " + token }
      });


      if (tokenRes !== 'Unauthenticated') {
        setUserData({
          token: token,
          user: tokenRes.data.user,
          role: tokenRes.data.role
        });
      }



    }

    checkLoggedIn();

  }, []);

  const [fuelType, setFuelType] = useState("1");

  console.log('changedfuel');


  return (
    <>
      <div>Welcome <strong>{userData.user === 'kwstas' ? 'No logged in' : userData.user}</strong>!</div>
      <ActionPanel setFuelType={setFuelType} />
      <Map fuelType={fuelType} ></Map>
      {console.log('HERE')}
    </>

  );
}

export default App;
