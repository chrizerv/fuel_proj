import React, { useState, useEffect, useContext } from 'react';
import { Modal, Table } from 'react-bootstrap';

import { axiosInstance } from '../axiosInstance';
import { UserContext } from '../userContext';

export function ConsumerOrdersModal({ show, handleClose }) {

  const { userData } = useContext(UserContext);
  const [orders, setOrders] = useState(undefined);


  useEffect(() => {
    console.log('ownerOrders-EFFECT');

    const getOrders = async () => {

      const ordersResponse = await axiosInstance.get("/orders/", {
        headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
      });

      setOrders(ordersResponse.data);
    }

    getOrders();

  }, [userData, show]);



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
                      fuelName={order.fuelName}
                      quantity={order.quantity}
                      totalPrice={order.totalPrice}
                      date={order.when}
                    />

                  );
                })}

              </tbody>
            </Table>)

            : null}

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
  fuelName,
  quantity,
  totalPrice, date }) {

  return (
    <tr>
      <td>{stationName}</td>
      <td>{stationAddress}</td>
      <td>{fuelName}</td>
      <td>{quantity}</td>
      <td>{totalPrice}</td>
      <td>{new Date(date).toLocaleString()}</td>
    </tr>);

}