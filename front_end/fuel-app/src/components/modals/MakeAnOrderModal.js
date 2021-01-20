import { useState } from 'react';
import { axiosInstance } from '../axiosInstance';
import { Button, Modal, ListGroup, FormControl } from 'react-bootstrap';


export function MakeAnOrderModal({ show, handleClose, catalog }) {

    const [selectedProduct, setSelectedProduct] = useState(catalog[0].productID);
    const [quantity, setQuantity] = useState('');


    const handleSubmit = async (e) => {

        const result = await axiosInstance.post("/orders/", {
            productID: selectedProduct,
            quantity: quantity
        }, {
            headers: { "Authorization": "Bearer " + localStorage.getItem('auth-token') }
        });

        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Make an Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select onChange={(e) => {
                        setSelectedProduct(e.target.value);
                    }}>
                        {catalog.map((product) => {
                            return <option value={product.productID}>{product.fuelName + ' --- ' + product.fuelPrice}</option>
                        })}
                    </select>
                    <br />
                    <span>Quantity: </span>
                    <input type="text" value={quantity} size="4" onChange={(e) => { setQuantity(e.target.value) }} />

                    <Button onClick={handleSubmit}>Submit</Button>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );

}