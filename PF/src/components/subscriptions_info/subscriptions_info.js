import React from 'react';
import {useRef} from 'react';
import { MDBFile } from 'mdb-react-ui-kit';
// import { pk } from '../subscriptions_choose/subscriptions_choose';
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

function SubscriptionsInfo() {
    // source: https://mdbootstrap.com/docs/react/extended/invoice/
    var obj;

    fetch('http://localhost:8000/subscriptions/info/' + Cookies.get('pk') + '/', {
            credentials: 'include',
        })
        .then ((response) => response.json())
        .then(data => obj = data)
        .then ((data) => console.log(data))
        .then(() => {
            if (Cookies.get('auth_token') == null) {
                window.location.href = '/login';
            }
            const name_on_card = document.getElementById('name_on_card');
            name_on_card.innerHTML = obj['data']['name_on_card'];
            const card_number = document.getElementById('card_number');
            const num = '**** **** **** ' + String(obj['data']['card_number']).slice(12,16);
            card_number.innerHTML = num;
            const expiry = document.getElementById('expiry');
            const ex = obj['data']['expiry_month'] + '/' + obj['data']['expiry_year'] ;
            expiry.innerHTML = ex;
            
            const pk = document.getElementById('pk');
            pk.innerHTML = 'invoice id #' + obj['data']['pk'];
            const price = document.getElementById('price');
            price.innerHTML = 'Total charge: $' + obj['data']['price'] + ' per ' + obj['data']['length'];
            const length = document.getElementById('length');
            length.innerHTML = obj['data']['length'];
            const current_charge = document.getElementById('current_charge');
            const curr = obj['data']['current_charge'].slice(0, 10);
            current_charge.innerHTML = curr;
            const next_charge = document.getElementById('next_charge');
            const next = obj['data']['next_charge'].slice(0, 10);
            next_charge.innerHTML = next;
            const subscribed = document.getElementById('subscribed');
            if (String(obj['data']['subscribed']) == 'true') {
                subscribed.innerHTML = obj['data']['subscribed'];
            }
      
          });

    return (
        // source: https://mdbootstrap.com/docs/react/extended/invoice/
        <MDBContainer style={{marginLeft: '22%', marginRight: '30%', marginTop: '10%', width: '150%'}}>

            <MDBCard className='text-black m-5' style={{marginLeft: '1000px', borderRadius: '25px', width: '60%'}}>
                <MDBCardBody>
                <MDBRow>
                <MDBCard>
                    <MDBCardBody className="mx-4">
                    <MDBContainer>
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Subscription Info</p>
                        <MDBRow>
                        <MDBTypography listUnStyled>
                            <li className="text-muted mt-1">
                            <span id='pk' className="text-black"></span>
                            </li>
                        </MDBTypography>
                        
                        <hr />
                        <MDBRow>
                        <MDBCol xl="10">
                            <p>Name on card</p>
                        </MDBCol>
                        <MDBCol xl="2">
                            <p id='name_on_card' className="float-end"></p>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol style={{width: '100px'}} xl="10">
                            <p>Card number</p>
                        </MDBCol>
                        <MDBCol id='card_number' style={{paddingLeft: '340px'}}>
                            {/* <p id='card_number' className=""></p> */}
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol xl="10">
                            <p>Expiry</p>
                        </MDBCol>
                        <MDBCol id='expiry' style={{paddingLeft: '50px'}} xl="2">
                            {/* <p id='expiry' className="float-end"></p> */}
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBCol xl="10">
                            <p>Length</p>
                        </MDBCol>
                        <MDBCol style={{paddingRight: '30px'}} xl="2">
                            <p id='length' className="float-end"></p>
                        </MDBCol>
                        <hr />
                        </MDBRow>
                        <MDBRow>
                        <MDBCol xl="10">
                            <p>Subscribed</p>
                        </MDBCol>
                        <MDBCol style={{paddingRight: '40px'}} xl="2">
                            <p id='subscribed' className="float-end"></p>
                        </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                        <MDBCol  xl="10">
                            <p>Current charge</p>
                        </MDBCol>
                        <MDBCol  xl="2">
                            <p id='current_charge' className="float-end"></p>
                        </MDBCol>
                        <hr />
                        </MDBRow>
                        <MDBRow>
                        <MDBCol  xl="10">
                            <p>Next Charge</p>
                        </MDBCol>
                        <MDBCol xl="2">
                            <p id='next_charge' className="float-end"></p>
                        </MDBCol>
                        <hr style={{ border: "2px solid black" }} />
                        </MDBRow>



                        
                        <MDBRow className="text-black">
                        <MDBCol xl="12">
                            <p id='price' className="float-end fw-bold"></p>
                        </MDBCol>
                        <hr style={{ border: "2px solid black" }} />
                        </MDBRow>

                    </MDBContainer>
                    </MDBCardBody>
                </MDBCard>
                </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
      );
}

export default SubscriptionsInfo;