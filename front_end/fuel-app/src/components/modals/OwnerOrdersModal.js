import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { axiosInstance } from '../axiosInstance';
import { UserContext } from '../userContext';

export function OwnerOrdersModal({ show, handleClose }) {

  const { userData } = useContext(UserContext);
  const [orders, setOrders] = useState(undefined);
  const [orderRemoved, setOrderRemoved] = useState(undefined);


  useEffect(() => {
    console.log('ownerOrders-EFFECT');

    const getOrders = async () => {

      const ordersResponse = await axiosInstance.get("/orders/", {
        headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
      });



      if (ordersResponse !== 'Unauthenticated') {
        setOrders(ordersResponse.data);
      } else {
        setOrders(undefined);
      }
    }

    getOrders();

  }, [userData, orderRemoved, show]);



  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>My Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {orders !== undefined ? (
            <Table responsive striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Station Name</th>
                  <th>Station Address</th>
                  <th>User</th>
                  <th>Fuel</th>
                  <th>Quantity</th>
                  <th>Total Price &euro;</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>

                {orders.map((order) => {

                  return (

                    <OrderItemRow
                      key={order.orderID}
                      orderID={order.orderID}
                      stationName={order.fuelCompNormalName}
                      stationAddress={order.gasStationAddress}
                      user={order.username}
                      fuelName={order.fuelName}
                      quantity={order.quantity}
                      totalPrice={order.totalPrice}
                      date={order.when}
                      setOrderRemoved={setOrderRemoved}
                    />

                  );
                })}

              </tbody>
            </Table>) : null}

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    </>
  );
}


function OrderItemRow({ orderID,
  stationName,
  stationAddress,
  user,
  fuelName,
  quantity,
  totalPrice, date, setOrderRemoved }) {

  return (
    <tr>
      <td>{stationName}</td>
      <td>{stationAddress}</td>
      <td>{user}</td>
      <td>{fuelName}</td>
      <td>{quantity}</td>
      <td>{totalPrice}</td>
      <td>{new Date(date).toLocaleString()}</td>
      <td><Button variant="danger" onClick={() => {

        axiosInstance.delete("/orders/" + orderID,
          {
            headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
          }).then(res => {
            setOrderRemoved(orderID);
          })

      }}>remove</Button></td>
    </tr>);

}