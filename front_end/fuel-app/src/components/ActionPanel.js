import { Button } from 'react-bootstrap';
import { LoginModal } from './modals/LoginModal';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './userContext';
import { axiosInstance } from './axiosInstance';


export function ActionPanel(props) {

 const { setUserData } = useContext(UserContext);
 const [loginShow, setLoginShow] = useState(false);

 const [stationsStats, setStationsStats] = useState({
  numOfStations: undefined,
  minPrice: undefined,
  avgPrice: undefined,
  maxPrce: undefined
 });


 const handleLoginClose = () => { setLoginShow(false) }
 const handleLoginShow = () => { setLoginShow(true) }

 const handleLogout = () => {
  localStorage.setItem('auth-token', '')

  setUserData({
   token: undefined,
   user: undefined,
   role: undefined
  });

 }

 useEffect(() => {
  console.log('ActionPanel-EFFECT');

  const loadNumAndStats = async () => {

   const statsResponse = await axiosInstance.get("/stations/numandstats/" + props.fuelType, {
    headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
   });


   setStationsStats({
    numOfStations: statsResponse.data[0].numOfStations,
    minPrice: statsResponse.data[0].minPrice,
    avgPrice: statsResponse.data[0].avgPrice,
    maxPrice: statsResponse.data[0].maxPrice
   });


  }

  loadNumAndStats();

 }, [props.fuelType]);



 return (
  <>

   <select onChange={(e) => {
    props.setFuelType(e.target.value);
   }}>
    <option value="1">Unleaded 95</option>
    <option value="2">Unleaded 100</option>
    <option value="3">Super</option>
    <option value="4">Diesel</option>
    <option value="5">Diesel(Heating oil)</option>
    <option value="6">Gas</option>
    <option value="7">Diesel(Heating oil) 500-1000 lt</option>
   </select>

   <strong> Gas Stations:</strong>
   <span>{stationsStats.numOfStations}</span>
   <strong>  min:</strong>
   <span>{stationsStats.minPrice}</span>
   <strong>  avg:</strong>
   <span>{stationsStats.avgPrice}</span>
   <strong>  max:</strong>
   <span>{stationsStats.maxPrice}</span>
   <button>My Orders</button>
   <Button>My Products</Button>

   <Button variant="primary" onClick={handleLoginShow}>
    Log in
   </Button>
   <LoginModal show={loginShow} handleClose={handleLoginClose}></LoginModal>
   <Button onClick={handleLogout}>Log out</Button>

  </>

 );
}