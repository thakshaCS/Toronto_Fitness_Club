import React from 'react';
import {useRef} from 'react';
import { Link } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import Cookies from 'js-cookie';
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
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Login() {

  function handleClick() {
    var obj;
    const username = document.getElementById('username').value;
    console.log(username)
    const password = document.getElementById('password').value;
    console.log(password)

    var dataa = new FormData()
    dataa.append('username', username)
    dataa.append('password', password)
    
    fetch('http://localhost:8000/accounts/login/', {
      method: 'POST',
      body: dataa
    })
    .then ((response) => response.json())
    .then(data => obj = data)
    .then ((data) => console.log(data))
    .then(() => {
      if (obj['username'] != null) {
        document.getElementById('p-username').innerText = obj['username']
      } else if (obj['username'] == null) {
        document.getElementById('p-username').innerText = ''
      } 
      if (obj['message'] != null) {
        document.getElementById('p-message').innerText = obj['message']
      } 
      if (obj['message'] != 'User does not exist, please try again') {
        document.getElementById('p-message').innerText = ''
      }

      if (obj['password'] != null) {
        document.getElementById('p-password').innerText = obj['password']
      } else {
        document.getElementById('p-password').innerText = ''
      }

      Cookies.set('auth_token', obj['data']['auth_token'])
      window.location.href = '/user/info';
     });
  }

  return (
    <MDBContainer style={{marginLeft: '25%', marginRight: '25%', marginTop: '15%', width: '150%'}}>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px', width: '60%'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

              <p id="p-username" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
              <div style={{marginTop: '0px'}} className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput style={{width: '250px'}} label='Username' id='username' type='text' className=''/>
              </div>

              <p id="p-password" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className=""></p>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput style={{width: '250px'}} label='Password' id='password' type='password' className=''/>
              </div>
              <p id="p-message" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
              <MDBBtn rounded style={{width: '150px'}} onClick={handleClick} className='mb-4' size='lg'>Login</MDBBtn>

              <div>
                Don’t have an account?{" "}
                <Link variant="subtitle2" component={RouterLink} to="/">
                Sign up
                </Link>
              </div>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://img.freepik.com/premium-vector/pixel-art-laptop-computer-icon-8bit-game-white-background_360488-238.jpg?w=2000' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;