import './App.css';

import { Container, Col, Row } from 'react-bootstrap';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Main from './main';
import Name from './name';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import PrivateRoute from './protected';

function App() {
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.removeItem('name');
    window.location.href = '/';
  };
  // setInterval(() => {
  //   window.location.href = '/main';
  // }, 10000);
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
              {name && <p className="mt-2">{name}</p>}
              {name && (
                <Nav.Link href="" onClick={(e) => handleLogout(e)}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/main" element={<Main />} />
          </Route>
          <Route exact path="/" element={<Name />} />
          {/* <Route exact path="/main" element={<Main />} /> */}
        </Routes>
      </Container>
    </>
  );
}

export default App;
