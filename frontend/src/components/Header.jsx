import React from 'react';
import { Navbar, Nav, Container,NavDropdown,Badge } from 'react-bootstrap';
import { FaSignOutAlt,FaSignInAlt } from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/userApiSlice';
import {logout} from '../slices/authSlices'
import { useNavigate } from 'react-router-dom';

 const Header = ()=>  {

  const {userInfo} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler =async() =>{
     try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
     } catch (error) {
      console.log(error);
     }
  }
  return (
 <div>
      <header>
    <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
            <Navbar.Brand >MERN App</Navbar.Brand>
            </LinkContainer>
            <Navbar.Brand aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id="baic-navbar-nav" >
                <Nav className='ms-auto'>
                {userInfo?(
                     <>
                     {userInfo.isAdmin==1?(
                      <>
                       <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to={'/profile'}>
                         <NavDropdown.Item>
                          Profile
                         </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        logout
                      </NavDropdown.Item>
                      <LinkContainer to={'/admin/usersList'}>
                         <NavDropdown.Item>
                          Users List
                         </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/admin/createUser'}>
                         <NavDropdown.Item>
                          Create User
                         </NavDropdown.Item>
                      </LinkContainer>
                     </NavDropdown>
                      </>
                     ):(
                      <>
                      <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to={'/profile'}>
                         <NavDropdown.Item>
                          Profile
                         </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        logout
                      </NavDropdown.Item>
                     </NavDropdown>
                      </>
                     )}
                     </>
                  ):(
                 <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt/> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                       <Nav.Link >
                          <FaSignOutAlt/> Sign Up
                      </Nav.Link>
                  </LinkContainer>
                 </>
                  )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
   </header>
 </div>
  );
}

export default Header