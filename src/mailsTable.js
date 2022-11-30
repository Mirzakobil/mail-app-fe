/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Container } from 'react-bootstrap';

function mailsTable() {
  const apiLink1 = 'https://mail-app-api.onrender.com';
  const apiLink2 = 'http://localhost:4000';
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
  // const data = useEffect(() => {
  //   fetch(`${apiLink1}/api/getMessages/${currentUser}`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setMails(json);
  //     });
  // }, []);
  // setInterval(() => {
  //   data()();
  // }, 8000);
  setInterval(() => {
    fetch(`${apiLink1}/api/getMessages/${currentUser}`)
      .then((response) => response.json())
      .then((json) => {
        setMails(json);
      });
  }, 8000);
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
