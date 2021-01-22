import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { axiosInstance } from '../axiosInstance';
import { UserContext } from '../userContext';

export function MyProductsModal({ show, handleClose }) {

  const { userData } = useContext(UserContext);
  const [myGasStations, setMyGasStations] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [selectedStation, setSelectedStation] = useState(undefined);
  const [newPrice, setNewPrice] = useState('');


  useEffect(() => {
    console.log('GasStations-EFFECT');

    const getGasStations = async () => {

      const stationsResponse = await axiosInstance.get("/stations/ownerstations", {
        headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
      });


      setMyGasStations(stationsResponse.data);
      setSelectedStation(stationsResponse.data[0].gasStationID);

    }

    getGasStations();

  }, [userData]);



  useEffect(() => {
    console.log('ProductsModal-EFFECT');

    const getProducts = async () => {

      if (selectedStation !== undefined) {
        const productsResponse = await axiosInstance.get("/pricedata/" + selectedStation, {
          headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
        });

        setProducts(productsResponse.data);
      }
    }

    getProducts();

  }, [selectedStation, newPrice]);


  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>My Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {myGasStations !== undefined ?
            (<select onChange={(e) => {
              setSelectedStation(e.target.value);
            }}>
              {myGasStations.map((station) => {
                return <option key={station.gasStationID} value={station.gasStationID}>{station.fuelCompNormalName + '---' + station.gasStationAddress}</option>
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
    <Button className="m-1" onClick={() => {
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