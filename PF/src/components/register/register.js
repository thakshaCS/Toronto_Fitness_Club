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
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Register() {
  // source: https://mdbootstrap.com/docs/react/extended/registration-form/

      function handleClick() {
        var obj;
        const first_name = document.getElementById('first_name').value;
        const last_name = document.getElementById('last_name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;
        const phone_number = document.getElementById('phone_number').value;
        const file = document.getElementById('avatar');
        console.log(first_name)
        console.log(last_name)
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(password2)
        console.log(file.files[0])


        var dataa = new FormData()
        dataa.append('first_name', first_name)
        dataa.append('last_name', last_name)
        dataa.append('username', username)
        dataa.append('email', email)
        dataa.append('password', password)
        dataa.append('password2', password2)
        dataa.append('phone_number', phone_number)
        if (file.files[0] != null) {
          dataa.append('avatar', file.files[0])
        }
        
        fetch('http://localhost:8000/accounts/register/', {
          method: 'POST',
          body: dataa
        })
        .then ((response) => response.json())
        .then(data => obj = data)
        .then ((data) => console.log(data))
        .then(() => {
          if (obj['username'] != null) {
            document.getElementById('p-username').innerText = obj['username']
          } else {
            document.getElementById('p-username').innerText = ''
          }
          if (obj['email'] != null) {
            document.getElementById('p-email').innerText = obj['email']
          } else {
            document.getElementById('p-email').innerText = ''
          }
    
          if (obj['password'] != null) {
            document.getElementById('p-password').innerText = obj['password']
          } else {
            document.getElementById('p-password').innerText = ''
          }
          if (obj['password2'] != null) {
            document.getElementById('p-password2').innerText = obj['password2']
          } else {
            document.getElementById('p-password2').innerText = ''
          }

          if (obj['message'] == 'User successfully registered') {
            window.location.href = '/login';
          }
          
         });
      }

  return (
    // source: https://mdbootstrap.com/docs/react/extended/registration-form/

    <MDBContainer style={{marginLeft: '25%', marginRight: '25%', marginTop: '10%', width: '150%'}}>

      <MDBCard className='text-black m-5' style={{marginLeft: '1000px', borderRadius: '25px', width: '70%'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
              
              <div style={{display: 'inlineBlock'}} className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput style={{width: '300px'}} label='First Name' id='first_name' type='text'/>
              </div>

              <div style={{display: 'inline-block'}} className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput style={{width: '300px'}} label='Last Name' id='last_name' type='text'/>
              </div>

              <p id="p-username" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput style={{width: '300px'}} label='Username' id='username' type='text'/>
              </div>
              
              <p id="p-email" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput style={{width: '300px'}} label='Email' id='email' type='email'/>
              </div>

              <p id="p-password" style={{fontSize: '12px', margin: '0px', marginLeft: '40px', marginBottom: '5px', color: 'red'}} className="text-align-center"></p>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput style={{width: '300px'}} label='Password' id='password' type='password'/>
              </div>

              <p id="p-password2" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput style={{width: '300px'}} label='Repeat Password' id='password2' type='password'/>
              </div>

              <p id="p-phone_number" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="mobile me-3" size='lg' />
                <MDBInput style={{width: '300px'}} label='Phone Number' id='phone_number' type='text'/>
              </div>

              <MDBFile label='Upload your avatar below' size='sm' id='avatar' style={{marginBottom: '20px', width: '200px'}}/>


              <MDBBtn rounded onClick={handleClick} className='mb-4' size='lg'>Register</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Register;