import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Axios from 'axios';

export function LoginModal({ show, handleClose }) {

  const [user, setUsername] = useState('');
  const [pass, setPassword] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessTokenRes = await Axios.post("http://localhost:5000/users/auth/token", {
      username: user,
      password: pass
    });
    console.log(accessTokenRes);

    localStorage.setItem('auth-token', accessTokenRes.data.accessToken);



    handleClose();



  }


  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Enter username" value={user} onChange={handleUsername} />
              <Form.Text className="text-muted">
                We'll never share your creds with anyone else.
    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={pass} onChange={handlePassword} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
  </Button>
          </Form>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>

    </>
  );
}