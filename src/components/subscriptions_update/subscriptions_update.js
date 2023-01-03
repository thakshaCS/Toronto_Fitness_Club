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
  MDBTypography,
  MDBBadge,
  MDBTable, 
  MDBTableHead, 
  MDBTableBody
}
from 'mdb-react-ui-kit';
import  { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
export var pk;

function SubscriptionsUpdate() {
    
    var obj;
    var avatar;
    var name;
    var price;
    var length;
    var obj;

    if (Cookies.get('auth_token') == null) {
        window.location.href = '/login';
    }

    function handleClick() {
        const price = document.getElementById('price').value;
        const length = document.getElementById('length').value;
    
        var dataa = new FormData()
        dataa.append('price', price)
        dataa.append('length', length)
        
        fetch('http://localhost:8000/subscriptions/update/' + Cookies.get('pk') + '/', {
          method: 'PUT',
          body: dataa,
          credentials: 'include',
        })
        .then ((response) => response.json())
        .then(data => obj = data)
        .then ((data) => console.log(data))
        .then(() => {
            if (obj['price'] != null) {
                document.getElementById('p-price').innerText = obj['price']
            } else {
                document.getElementById('p-price').innerText = ''
            }
            if (obj['length'] != null) {
                document.getElementById('p-length').innerText = obj['length']
            } else {
                document.getElementById('p-length').innerText = ''
            }

            if (obj['message'] == "Successfully updated subscription plan") {
                window.location.href = '/subscriptions/info';
            }
        });

    }

    return (
        <MDBContainer style={{marginLeft: '22%', marginRight: '30%', marginTop: '10%', width: '150%'}}>

            <MDBCard className='text-black m-5' style={{marginLeft: '1000px', borderRadius: '25px', width: '70%'}}>
                <MDBCardBody>
                <MDBRow>
                    <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update Plan</p>

                        <p id="p-price" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
                        <div style={{marginTop: '0px'}} className="d-flex flex-row align-items-center mb-4 ">
                        <MDBIcon fas icon="money-bill-alt me-3" />
                        <MDBInput style={{width: '250px'}} label='Price' id='price' type='number' className=''/>
                        </div>

                        <p id="p-length" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className=""></p>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="ruler me-3" />
                        <MDBInput style={{width: '250px'}} label='Length' id='length' type='text' className=''/>
                        </div>
                        <p id="p-message" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
                        <MDBBtn rounded style={{width: '150px'}} onClick={handleClick} className='mb-4' size='lg'>Choose</MDBBtn>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                        <MDBCardImage src='https://cdn-icons-png.flaticon.com/512/2921/2921222.png' fluid/>
                    </MDBCol>
                </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
      );
}

export default SubscriptionsUpdate;