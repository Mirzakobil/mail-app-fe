/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Stack, Autocomplete, TextField } from '@mui/material';

function sendMessage() {
  const apiLink1 = 'https://mail-app-api.onrender.com';
  const apiLink2 = 'http://localhost:4000';
  const [recipient, setRecepiet] = useState('');
  const [title, setTitle] = useState('');
  const [messageBody, setMessage] = useState('');
  const [error, setError] = useState('');
  const [allmails, setAllMails] = useState([]);
  const unsortedNames = [''];

  useEffect(() => {
    fetch(`${apiLink1}/api/getMessages/`)
      .then((response) => response.json())
      .then((json) => setAllMails(json));
  }, []);
  allmails.map((e) => {
    unsortedNames.push(e.sender);
    unsortedNames.push(e.recipient);
  });
  const names = [...new Set(unsortedNames)];

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
      .then(() => {
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
          <Stack className="mb-3" spacing={2} width="100%">
            <Autocomplete
              options={names}
              renderInput={(params) => (
                <TextField {...params} label="Recipient" />
              )}
              value={recipient}
              onChange={(e, data) => setRecepiet(data)}
              autoSelect
              freeSolo
            />
          </Stack>
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
