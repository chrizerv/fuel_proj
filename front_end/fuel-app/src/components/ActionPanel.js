import { Button, Modal } from 'react-bootstrap';
import { LoginModal } from './modals/LoginModal';
import { useEffect, useState } from 'react';


export function ActionPanel(props) {

 const [loginShow, setLoginShow] = useState(false);

 const handleLoginClose = () => setLoginShow(false);
 const handleLoginShow = () => setLoginShow(true);

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
   <Button onClick={() => { localStorage.setItem('auth-token', '') }}>Log out</Button>
  </>

 );
}