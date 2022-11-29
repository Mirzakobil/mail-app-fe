/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function name() {
  const [name, setName] = useState('');

  const handleName = () => {
    localStorage.setItem('name', name);
  };
  return (
    <>
      <Container>
        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
            />
          </Form.Group>
        </Form>
        <Button
          href="/main"
          onClick={() => handleName()}
          className="mb-3"
          variant="primary"
        >
          Open messages
        </Button>
      </Container>
    </>
  );
}

export default name;
