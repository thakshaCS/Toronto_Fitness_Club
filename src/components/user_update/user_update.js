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
  MDBPopover, 
  MDBPopoverBody, 
  MDBPopoverHeader
}
from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';

function UserUpdate() {

    if (Cookies.get('auth_token') == null) {
        window.location.href = '/login';
    }

      function handleClick() {
        var obj;
        const first_name = document.getElementById('first_name').value;
        const last_name = document.getElementById('last_name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone_number = document.getElementById('phone_number').value;
        const file = document.getElementById('avatar');
        console.log(first_name)
        console.log(last_name)
        console.log(username)
        console.log(email)
        console.log(file.files[0])


        var dataa = new FormData()
        if (first_name !== '') {
            dataa.append('first_name', first_name)
        }
        if (last_name !== '') {
            dataa.append('last_name', last_name)
        }
        if (username !== '') {
            dataa.append('username', username)
        }
        if (email !== '') {
            dataa.append('email', email)
        }
        if (phone_number !== '') {
            dataa.append('phone_number', phone_number)
        }
        if (file.files[0] != null) {
            dataa.append('avatar', file.files[0])
        }
        
        fetch('http://localhost:8000/accounts/user/update', {
          credentials: 'include',
          method: 'PUT',
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
            if (obj['phone_number'] != null) {
              document.getElementById('p-phone_number').innerText = obj['phone_number']
            } else {
              document.getElementById('p-phone_number').innerText = ''
            }
           });
      }

  return (
    <MDBContainer style={{marginLeft: '25%', marginRight: '25%', marginTop: '10%', width: '150%'}}>

      <MDBCard className='text-black m-5' style={{marginLeft: '1000px', borderRadius: '25px', width: '60%'}}>
        <MDBCardBody>
          <MDBRow>
              <p className="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update User Info</p>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              
              <div style={{display: 'inlineBlock'}} className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput style={{width: '250px'}} label='First Name' id='first_name' type='text'/>
              </div>

              <div style={{display: 'inline-block'}} className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput style={{width: '250px'}} label='Last Name' id='last_name' type='text'/>
              </div>
              
              <p id="p-username" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user-edit me-3" size='lg' />
                <MDBInput style={{width: '250px'}} label='Username' id='username' type='text'/>
              </div>
              
              <p id="p-email" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput style={{width: '250px'}} label='Email' id='email' type='email'/>
              </div>
            
              <p id="p-phone_number" style={{fontSize: '12px', margin: '0px', color: 'red', marginBottom: '5px'}} className="text-align-center"></p>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="mobile me-3" size='lg' />
                <MDBInput style={{width: '250px'}} label='Phone Number' id='phone_number' type='text'/>
              </div>

              <MDBFile label='Upload your new avatar below' size='sm' id='avatar' style={{marginBottom: '20px', width: '200px'}}/>


              <MDBBtn rounded onClick={handleClick} className='mb-4' size='lg'>Update</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <MDBCardImage style={{marginTop: '-50px'}} src='https://static.vecteezy.com/system/resources/previews/005/377/464/original/upgrade-of-software-line-icon-computer-system-update-linear-pictogram-download-process-icon-progress-of-upgrade-illustration-vector.jpg' fluid/>
                <MDBPopover rounded size='lg' color='danger' btnChildren='Read before updating'>
                    <MDBPopoverBody>Only if you decide to change the username, you will need to login again with the new username </MDBPopoverBody>
                </MDBPopover>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      {/* <MDBCard className='text-black m-5' style={{marginLeft: '1000px', marginTop: '', borderRadius: '25px', width: '60%', height: '80px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol style={{marginTop: '-10px'}} className='order-2 order-lg-1 d-flex flex-column'>
              <p className="">Note: If you decide to change the username, you will need to login again to view the user info</p>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard> */}

    </MDBContainer>
  );
}

export default UserUpdate;