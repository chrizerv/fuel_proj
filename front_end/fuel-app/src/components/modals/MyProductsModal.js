import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { axiosInstance } from '../axiosInstance';

export function MyProductsModal({ show, handleClose }) {

  const [gasStations, setGasStations] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');


  useEffect(() => {
    console.log('GasStations-EFFECT');

    const getGasStations = async () => {

      const stationsResponse = await axiosInstance.get("/stations/ownerstations", {
        headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
      });

      if (stationsResponse !== 'Unauthenticated') {
        setGasStations(stationsResponse.data);
        setSelectedStation(stationsResponse.data[0].gasStationID);
      }
    }

    getGasStations();
    //rerender on login logout userdatacontext
  }, []);



  useEffect(() => {
    console.log('ProductsModal-EFFECT');

    const getProducts = async () => {

      const productsResponse = await axiosInstance.get("/pricedata/" + selectedStation, {
        headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
      });

      setProducts(productsResponse.data);
    }

    getProducts();
    //rerender on login logout userdatacontext
  }, [selectedStation]);







  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>My Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {gasStations !== undefined ?
            (<select onChange={(e) => {
              setSelectedStation(e.target.value);
            }}>
              {gasStations.map((station) => {
                return <option value={station.gasStationID}>{station.fuelCompNormalName + '---' + station.gasStationOwner}</option>
              })}
            </select>) : null}



          {products !== undefined ? (
            <ListGroup>
              {products.map((product) => {
                return (
                  <ListGroup.Item key={product.productID}>
                    Name: {product.fuelName}
                    <br />
                    Price: {product.fuelPrice}
                    <Button>Change</Button>
                  </ListGroup.Item>);
              })}
            </ListGroup>) : null}

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    </>
  );
}