/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function mailsTable() {
  const apiLink2 = 'https://user-dashboard-api.onrender.com';
  const apiLink1 = 'http://localhost:4000';
  const currentUser = localStorage.getItem('name');
  const [mails, setMails] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageSize, setPageSize] = useState(7);
  const columns = [
    { field: 'sender', headerName: 'Sender', width: 110 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'messageBody', headerName: 'Message', width: 654 },
    { field: 'sentTime', headerName: 'Sent Time', width: 200 },
  ];

  useEffect(() => {
    fetch(`${apiLink1}/api/getMessages/${currentUser}`)
      .then((response) => response.json())
      .then((json) => setMails(json));
  }, []);
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
            onSelectionModelChange={(params) => setChecked(params)}
          />
        </div>
      </Container>
    </>
  );
}

export default mailsTable;
