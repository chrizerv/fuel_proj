import { Button } from 'react-bootstrap';
import { LoginModal } from './modals/LoginModal';
import { MyProductsModal } from './modals/MyProductsModal';
import { OwnerOrdersModal } from './modals/OwnerOrdersModal';
import { ConsumerOrdersModal } from './modals/ConsumerOrdersModal';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './userContext';
import { axiosInstance } from './axiosInstance';


export function ActionPanel(props) {

 const { userData, setUserData } = useContext(UserContext);
 const [loginShow, setLoginShow] = useState(false);
 const [myProductsShow, setMyProductsShow] = useState(false);
 const [ordersShow, setOrdersShow] = useState(false);

 const [stationsStats, setStationsStats] = useState({
  numOfStations: undefined,
  minPrice: undefined,
  avgPrice: undefined,
  maxPrce: undefined
 });


 const handleLoginClose = () => { setLoginShow(false) }
 const handleLoginShow = () => { setLoginShow(true) }

 const handleMyProductsClose = () => { setMyProductsShow(false) }
 const handleMyProductsShow = () => { setMyProductsShow(true) }

 const handleOrdersClose = () => { setOrdersShow(false) }
 const handleOrdersShow = () => { setOrdersShow(true) }

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

   <span className=" m-1 font-weight-bold">Gas Stations:</span>
   <span>{stationsStats.numOfStations}</span>
   <span className=" m-1 font-weight-bold">min:</span>
   <span>{stationsStats.minPrice}</span>
   <span className=" m-1 font-weight-bold">avg:</span>
   <span>{stationsStats.avgPrice}</span>
   <span className=" m-1 font-weight-bold">max:</span>
   <span>{stationsStats.maxPrice}</span>


   {userData.role === 'stationOwner' ?
    <>

     <OwnerOrdersModal show={ordersShow} handleClose={handleOrdersClose} />
     <MyProductsModal show={myProductsShow} handleClose={handleMyProductsClose}></MyProductsModal>
     <Button className="m-1" variant="primary" onClick={handleMyProductsShow}>
      My Products
     </Button>

    </> : null}

   {userData.role === 'fuelConsumer' ?
    <ConsumerOrdersModal show={ordersShow} handleClose={handleOrdersClose} />
    : null}

   {userData.user === undefined ?
    <>
     <Button className="m-1" variant="primary" onClick={handleLoginShow}>
      Log in
    </Button>
     <LoginModal show={loginShow} handleClose={handleLoginClose}></LoginModal>
     <span>Not logged in</span>
    </>
    :
    <>
     <Button className="m-1" variant="primary" onClick={handleOrdersShow}>
      My Orders
    </Button>

     <Button className="m-1" onClick={handleLogout}>
      Log out
    </Button>
     <span className=" m-1 font-weight-bold">{'Welcome: ' + userData.user}</span>
    </>
   }
  </>

 );
}