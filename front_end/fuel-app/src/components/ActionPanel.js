import { Button } from 'react-bootstrap';
import { LoginModal } from './modals/LoginModal';
import { useContext, useState } from 'react';
import { UserContext } from './userContext';



export function ActionPanel(props) {

 const { setUserData } = useContext(UserContext);
 const [loginShow, setLoginShow] = useState(false);

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



 return (
  <>

   <select onChange={(e) => {
    props.setFuelType(e.target.value);
   }}>
    <option value="1">Unleaded 95</option>
    <option value="2">Unleaded 100</option>
    <option value="4">Diesel</option>
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
   <Button>My Products</Button>

   <Button variant="primary" onClick={handleLoginShow}>
    Log in
   </Button>
   <LoginModal show={loginShow} handleClose={handleLoginClose}></LoginModal>
   <Button onClick={handleLogout}>Log out</Button>

  </>

 );
}