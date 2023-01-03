import React, { useState } from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements';
// import { MDBDropdown, MDBNavbarItem, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
  } from 'mdb-react-ui-kit';
const Navbar  = () => {
    const [showBasic, setShowBasic] = useState(false);

    return (
        // <>
        // <Nav>
        //     <NavLink to='/'>
        //         <h3>Toronto Fitness Clubs</h3>
        //     </NavLink>
        //     <Bars />
        //     <NavMenu>
        //             {/* <NavLink to='/accounts' activeStyle>
        //                 Accounts
        //             </NavLink> */}
        //       <MDBDropdown>
        //         <MDBDropdownToggle tag='a' className='nav-link' role='button' color='light'>
        //           Dropdown
        //         </MDBDropdownToggle>
        //         <MDBDropdownMenu>
        //           <MDBDropdownItem link>Action</MDBDropdownItem>
        //           <MDBDropdownItem link>Another action</MDBDropdownItem>
        //           <MDBDropdownItem link>Something else here</MDBDropdownItem>
        //         </MDBDropdownMenu>
        //       </MDBDropdown>
        //             <NavLink to='/studios' activeStyle>
        //                 Studios
        //             </NavLink>
        //             <NavLink to='/classes' activeStyle>
        //                 Classes
        //             </NavLink>
        //             <NavLink to='/subscriptions' activeStyle>
        //                 Subscriptions
        //             </NavLink>
        //             <NavBtn>
        //                 <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        //             </NavBtn>

        //     </NavMenu>
        // </Nav>
        // </>
    <>
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>Toronto Fitness Clubs</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
          <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Accounts
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href="/register">Register</MDBDropdownItem>
                  <MDBDropdownItem link href="/login">Login</MDBDropdownItem>
                  <MDBDropdownItem link href="/user/info">User Info</MDBDropdownItem>
                  <MDBDropdownItem link href="/user/update">Update Info</MDBDropdownItem>
                  <MDBDropdownItem link href="/logout">Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/find_studios/'>Studios</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/classes'>Classes</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                    Subscriptions
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link href="/subscriptions/choose">Choose Plan</MDBDropdownItem>
                    <MDBDropdownItem link href="/subscriptions/card">Add/Update Card</MDBDropdownItem>
                    <MDBDropdownItem link href="/subscriptions/info">Info</MDBDropdownItem>
                    <MDBDropdownItem link href="/subscriptions/start">Start/Cancel</MDBDropdownItem>
                    <MDBDropdownItem link href="/subscriptions/update">Update</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>


        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </>
    );
};

export default Navbar;


