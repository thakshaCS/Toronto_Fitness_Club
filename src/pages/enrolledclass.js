import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
const Class2 = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <h1>You have enrolled successfully</h1>
      <MDBBtn href="/classes">Go Back to Classes</MDBBtn>
    </div>
  );
};

export default Class2;