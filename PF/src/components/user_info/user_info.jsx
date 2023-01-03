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
import  { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

function UserInfo() {
  // source: https://mdbootstrap.com/docs/react/extended/profiles/
    
    var obj;
    var avatar;
    
    fetch ('http://localhost:8000/accounts/user/info', {
        credentials: 'include',
    })
    .then ((response) => response.json())
    .then(data => obj = data)
    .then ((data) => console.log(data))
    .then(() => {
      // console.log(Cookies.get('auth_token', obj['data']['auth_token']))
        if (obj['message'] == "you are not authorized to access user info, login again") {
            // console.log('hi');
            window.location.href = '/login';
        }
        const file = document.getElementById('avatarr');
        const full = document.getElementById('full_name');
        full.innerHTML = obj['data']['first_name'] + ' ' + obj['data']['last_name'];
        const username = document.getElementById('username');
        username.innerHTML = '@' + obj['data']['username'] + `<span className="mx-2"> |</span> 
        <a id='email' href="#!">email</a> <span className="mx-2"> |</span> <MDBTypography className="text-muted mb-4" id='phone_number'></MDBTypography>`;
        const email = document.getElementById('email');
        email.innerHTML = obj['data']['email'];
        const phone_number = document.getElementById('phone_number');
        const phone = (obj['data']['phone_number']).slice(0, 3) + '-' + (obj['data']['phone_number']).slice(3, 6) + '-' + (obj['data']['phone_number']).slice(6,11);
        const phone2 = phone.slice(0, 3);
        phone_number.innerHTML = phone;
        file.src = 'http://localhost:8000' + obj['data']['avatar']
        console.log('http://localhost:8000' + obj['data']['avatar'])

        

    });

  return (
    // source: https://mdbootstrap.com/docs/react/extended/profiles/
    
    <div className="vh-100">
      <MDBContainer style={{marginRight: '300px', width: '80%'}} className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{marginRight: '2000px', borderRadius: '25px', width: '120%'}}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                    <MDBCardImage id='avatarr' style={{width: '110px', height: '110px', borderRadius: '50%'}} className='img-fluid rounded-circle' fluid/>
                </div>
                <MDBTypography id='full_name' tag="h4"></MDBTypography>
                <MDBTypography className="text-muted mb-4" id='username'></MDBTypography>
                {/* <MDBCardText id='username' className="text-muted mb-4">
                </MDBCardText> */}
                <div className="mb-4 pb-2">
                  <MDBBtn outline floating>
                    <MDBIcon fab icon="facebook" size="lg" />
                  </MDBBtn>
                  <MDBBtn outline floating className="mx-1">
                    <MDBIcon fab icon="twitter" size="lg" />
                  </MDBBtn>
                  <MDBBtn outline floating>
                    <MDBIcon fab icon="skype" size="lg" />
                  </MDBBtn>
                </div>
                <MDBBtn rounded size="lg">
                  User logged in!
                </MDBBtn>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">8471</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">8512</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">4751</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default UserInfo;