import "./App.css";
import { Icon } from "leaflet";
import { useEffect, useState, createContext } from 'react';
import { axiosInstance } from './components/axiosInstance';
import { ActionPanel } from './components/ActionPanel';
import { Map } from './components/Map';
import { UserContext } from './components/userContext';

const cat = new Icon({
  iconUrl: "./cat-svgrepo-com.svg",
  iconSize: [50, 50]
});




function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    role: undefined
  });



  useEffect(() => {
    console.log('App-EFFECT');

    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }


      const userInfoResponse = await axiosInstance.get("/users/info", {
        headers: { "Authorization": "Bearer " + token }
      });


      if (userInfoResponse !== 'Unauthenticated') {
        setUserData({
          token: token,
          user: userInfoResponse.data.user,
          role: userInfoResponse.data.role
        });
      }

    }

    checkLoggedIn();

  }, []);

  const [fuelType, setFuelType] = useState("1");


  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div>Welcome <strong>{userData.user === 'kwstas' ? 'No logged in' : userData.user}</strong>!</div>

        <ActionPanel setFuelType={setFuelType} />
        <Map fuelType={fuelType} ></Map>
      </UserContext.Provider>
      {console.log('APP-render')}
    </>

  );
}

export default App;
