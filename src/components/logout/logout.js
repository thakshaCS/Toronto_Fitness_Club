import React from 'react';
import {useRef} from 'react';
import { MDBFile } from 'mdb-react-ui-kit';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
  MDBCardText, 
  MDBTypography
}
from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Logout() {
    const nav = useNavigate();
    var obj;
    var avatar;
    
    fetch ('http://localhost:8000/accounts/logout/', {
        credentials: 'include',
        method: 'POST'
    })
    .then ((response) => response.json())
    .then(data => obj = data)
    .then ((data) => console.log(data))
    .then(data => {
        Cookies.remove('auth_token')
        window.location.href = '/login';
      })
}

export default Logout;