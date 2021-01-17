import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup, FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { axiosInstance } from '../axiosInstance';

export function MyProductsModal({ show, handleClose }) {

  const [gasStations, setGasStations] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [newPrice, setNewPrice] = useState('');


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
  }, [selectedStation, newPrice]);







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

                  <ProductItem
                    key={product.productID}
                    productID={product.productID}
                    name={product.fuelName}
                    price={product.fuelPrice}
                    setPrice={setNewPrice} />

                );
              })}
            </ListGroup>) : null}

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    </>
  );
}


function ProductItem({ productID, name, price, setPrice }) {

  const [editable, setEditable] = useState(false);
  const [changedValue, setChangedValue] = useState(price);

  return (<ListGroup.Item >
    Name: {name}
    <br />
    Price:{editable ? <input type="text" value={changedValue} size="4" onChange={(e) => { setChangedValue(e.target.value) }} /> : price}
    <Button onClick={() => {
      if (editable) {

        axiosInstance.put("/pricedata/" + productID,
          { newPrice: changedValue },
          {
            headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
          }).then(res => {
            setPrice(changedValue);
          })

      }

      setEditable(!editable)

    }}>{editable ? 'Update' : 'Edit'}</Button>
  </ListGroup.Item>);

}