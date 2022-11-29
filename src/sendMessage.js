/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { useEffect, useState } from 'react';

function sendMessage() {
  const apiLink2 = 'https://user-dashboard-api.onrender.com';
  const apiLink1 = 'http://localhost:4000';
  const [recipient, setRecepiet] = useState('');
  const [title, setTitle] = useState('');
  const [messageBody, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    const name = localStorage.getItem('name');
    const configuration = {
      method: 'post',
      url: `${apiLink1}/api/sendMessage/${name}`,
      data: {
        recipient,
        title,
        messageBody,
      },
    };
    axios(configuration)
      .then((result) => {
        setRecepiet('');
        setTitle('');
        setMessage('');
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });

    e.preventDefault();
  };
  return (
    <>
      <Container className="mt-3">
        <h2>Send Message:</h2>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              name="recepiet"
              value={recipient}
              onChange={(e) => setRecepiet(e.target.value)}
              type="text"
              placeholder="Recepiet"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="lg"
              type="text"
              placeholder="Title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              name="message"
              value={messageBody}
              onChange={(e) => setMessage(e.target.value)}
              as="textarea"
              placeholder="Message..."
              rows={3}
            />
          </Form.Group>
        </Form>
        <Button
          onClick={(e) => handleSubmit(e)}
          className="mb-3"
          variant="primary"
        >
          Send message
        </Button>
      </Container>
    </>
  );
}

export default sendMessage;
