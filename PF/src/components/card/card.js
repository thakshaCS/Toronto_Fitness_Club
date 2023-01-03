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
    
    var obj;
    var avatar;
    var name;
    var price;
    var length;

    if (Cookies.get('auth_token') == null) {
        window.location.href = '/login';
    }

    function handleClick() {
        var obj;
        const name_on_card = document.getElementById('name_on_card').value;
        const card_number = document.getElementById('card_number').value;
        const expiry_month = document.getElementById('expiry_month').value;
        const expiry_year = document.getElementById('expiry_year').value;
        const cvc = document.getElementById('cvc').value;
    
        var dataa = new FormData()
        dataa.append('name_on_card', name_on_card)
        dataa.append('card_number', card_number)
        dataa.append('expiry_month', expiry_month)
        dataa.append('expiry_year', expiry_year)
        dataa.append('cvc', cvc)
        // dataa.append('length', length)
        
        fetch('http://localhost:8000/subscriptions/card/' + Cookies.get('pk') + '/', {
          method: 'PUT',
          body: dataa,
          credentials: 'include',
        })
        .then ((response) => response.json())
        .then(data => obj = data)
        .then ((data) => console.log(data))
        .then(() => {
            if (obj['name_on_card'] != null) {
                document.getElementById('p-name_on_card').innerText = obj['name_on_card']
            } else {
                document.getElementById('p-name_on_card').innerText = ''
            }
            if (obj['card_number'] != null) {
                document.getElementById('p-card_number').innerText = obj['card_number']
            } else {
                document.getElementById('p-card_number').innerText = ''
            }
            if (obj['expiry_month'] != null) {
                document.getElementById('p-expiry_month').innerText = obj['expiry_month']
            } else {
                document.getElementById('p-expiry_month').innerText = ''
            }
            if (obj['expiry_year'] != null) {
                document.getElementById('p-expiry_year').innerText = obj['expiry_year']
            } else {
                document.getElementById('p-expiry_year').innerText = ''
            }
            if (obj['cvc'] != null) {
                document.getElementById('p-cvc').innerText = obj['cvc']
            } else {
                document.getElementById('p-cvc').innerText = ''
            }
            if (obj['message'] != null) {
                document.getElementById('p-message').innerText = obj['message']
            } else {
                document.getElementById('p-message').innerText = ''
            }

            if (obj['message'] == "Successfully updated card details") {
                window.location.href = '/subscriptions/start';
            }
         });
    }

    return (
        <MDBContainer style={{marginLeft: '22%', marginRight: '30%', marginTop: '10%', width: '150%'}}>

            <MDBCard className='text-black m-5' style={{marginLeft: '1000px', borderRadius: '25px', width: '70%'}}>
                <MDBCardBody>
                <MDBRow>
                    <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Enter/Update Card Information</p>

                        <p id="p-name_on_card" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
                        <div style={{marginTop: '0px'}} className="d-flex flex-row align-items-center mb-4 ">
                        <MDBIcon fas icon="credit-card me-3" />
                        <MDBInput style={{width: '270px'}} label="Cardholder's Name" id='name_on_card' type='text' className=''/>
                        </div>

                        <p id="p-card_number" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className=""></p>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="credit-card me-3" />
                        <MDBInput style={{width: '270px'}} label="Card's Number" id='card_number' type='number' className=''/>
                        </div>

                        <p id="p-expiry_month" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className=""></p>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="credit-card me-3" />
                        <MDBInput style={{width: '270px'}} label="Expiry Month" id='expiry_month' type='number' className=''/>
                        </div>

                        <p id="p-expiry_year" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className=""></p>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="credit-card me-3" />
                        <MDBInput style={{width: '270px'}} label="Expiry Year" id='expiry_year' type='number' className=''/>
                        </div>

                        <p id="p-cvc" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className=""></p>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="credit-card me-3" />
                        <MDBInput style={{width: '270px'}} label="CVC" id='cvc' type='number' className=''/>
                        </div>

                        <p id="p-message" style={{fontSize: '12px', margin: '0px', color: 'green', marginBottom: '5px'}} className="text-align-center"></p>
                        <MDBBtn rounded style={{width: '150px'}} onClick={handleClick} className='mb-4' size='lg'>Choose</MDBBtn>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <MDBCardImage style={{marginTop: '150px', marginBottom: '30px', width: '350px'}} src='https://cdn-icons-png.flaticon.com/512/1087/1087080.png' fluid/>
                        </MDBCol>
                </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
      );
}

export default CardStart;