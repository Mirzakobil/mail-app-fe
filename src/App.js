import './App.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import SendMessage from './sendMessage';
import Button from 'react-bootstrap/Button';
import MailsTable from './mailsTable';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  const [name, setName] = useState('');
  const [nameExists, setNameExists] = useState(false);
  const handleName = () => {
    localStorage.setItem('name', name);
    setNameExists(true);
  };
  const handleLogout = () => {
    localStorage.removeItem('name');
    window.location.href = '/';
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Mail App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {nameExists && <p className="mt-2">{name}</p>}
              {nameExists && (
                <Nav.Link href="" onClick={(e) => handleLogout(e)}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {!nameExists && (
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
            onClick={() => handleName()}
            className="mb-3"
            variant="primary"
          >
            Open messages
          </Button>
        </Container>
      )}
      {nameExists && <SendMessage />}
      {nameExists && <MailsTable />}
    </>
  );
}

export default App;
