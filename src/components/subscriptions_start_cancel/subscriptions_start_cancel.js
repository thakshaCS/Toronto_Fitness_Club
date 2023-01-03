import React from 'react';
import {useRef} from 'react';
import { MDBFile } from 'mdb-react-ui-kit';
import { pk } from '../subscriptions_choose/subscriptions_choose';
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
  MDBTypography,
  MDBBadge,
  MDBTable, 
  MDBTableHead, 
  MDBTableBody
}
from 'mdb-react-ui-kit';
import  { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

function CardStart() {
    if (Cookies.get('auth_token') == null) {
        window.location.href = '/login';
    }

    function handleClick2() {
        var obj;
        
        fetch('http://localhost:8000/subscriptions/start/' + Cookies.get('pk') + '/', {
          method: 'PUT',
          credentials: 'include',
        })
        .then ((response) => response.json())
        .then(data => obj = data)
        .then ((data) => console.log(data))
        .then(() => {
            if (obj['message'] == "Successfully started the subscription") {
                document.getElementById('p-message1').innerText = obj['message']
                window.location.href = '/subscriptions/info';
            }
         });
    }

    function handleClick3() {
        var obj;
        
        fetch('http://localhost:8000/subscriptions/cancel/' + Cookies.get('pk') + '/', {
          method: 'PUT',
          credentials: 'include',
        })
        .then ((response) => response.json())
        .then(data => obj = data)
        .then ((data) => console.log(data))
        .then(() => {
            if (obj['message'] == "Successfully cancelled your subscription") {
                document.getElementById('p-message2').innerText = obj['message']
                window.location.href = '/subscriptions/info';
            }
         });
    }

    return (
        <MDBContainer style={{marginLeft: '32%', marginRight: '30%', marginTop: '10%', width: '150%'}}>

            <MDBCard className='text-black m-5' style={{marginLeft: '1000px', borderRadius: '25px', width: '40%'}}>
                <MDBCardBody>
                <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <MDBCardImage style={{marginTop: '50px', marginBottom: '30px', marginLeft: '220px', width: '250px'}} src='https://cdn-icons-png.flaticon.com/512/1087/1087080.png' fluid/>
                            <p id="p-message1" style={{width: '300px',fontSize: '12px', margin: '0px', marginLeft: '300px', color: 'green', marginBottom: '5px'}} className="text-align-center"></p>
                            <MDBBtn rounded style={{width: '200px', marginLeft: '220px'}} onClick={handleClick2} className='mb-4' size='lg'>Start Subscription</MDBBtn>
                            <p id="p-message2" style={{width: '300px',fontSize: '12px', margin: '0px', marginLeft: '300px', color: 'green', marginBottom: '5px'}} className="text-align-center"></p>
                            <MDBBtn rounded style={{width: '200px', marginLeft: '220px'}} onClick={handleClick3} className='mb-4' size='lg'>Cancel Subscription</MDBBtn>
                        </MDBCol>
                </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
      );
}

export default CardStart;