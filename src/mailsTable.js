/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Container } from 'react-bootstrap';

function mailsTable() {
  const apiLink1 = 'https://mail-app-api.onrender.com';
  const apiLink2 = 'http://localhost:4000';
  const currentUser = localStorage.getItem('name');
  const [mails, setMails] = useState([]);
  const [messageBody, setMessageBody] = useState([]);
  const [pageSize, setPageSize] = useState(7);

  const columns = [
    { field: 'sender', headerName: 'Sender', width: 150 },
    { field: 'title', headerName: 'Title', width: 180 },
    { field: 'messageBody', headerName: 'Message', width: 560 },
    { field: 'sentTime', headerName: 'Sent Time', width: 200 },
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setInterval(() => {
      fetch(`${apiLink1}/api/getMessages/${currentUser}`)
        .then((response) => response.json())
        .then((json) => {
          setMails(json);
        });
    }, 5000);
  }, []);

  const handleRowSelection = (id) => {
    mails.map((e) => {
      if (e._id === id[0]) {
        setMessageBody(e);
      }
    });
  };
  return (
    <>
      <Container>
        <div className="mt-3" style={{ height: 475, width: '100%' }}>
          <DataGrid
            rows={mails}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={pageSize}
            loading={!mails.length}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            rowsPerPageOptions={[7, 10, 20]}
            onSelectionModelChange={(params) => {
              handleRowSelection(params);
              handleShow();
            }}
          />
        </div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h1>{messageBody.title}</h1>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h4>{messageBody.sender}</h4>
            <div>{messageBody.messageBody}</div>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </>
  );
}

export default mailsTable;
