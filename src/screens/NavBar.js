import { Navbar, Nav, Button } from 'react-bootstrap'
import React from 'react'
import logo from '../covidLogo.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions.js'

const NavBar = () => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  const userState = useSelector((state) => state.userState)

  return (
    <Navbar className='navbar'>
      <Navbar.Brand className='navbar-brand' href='/'>
        <img alt='' src={logo} width='55' height='55' className='logo' />
        COVID-19 Tracker
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav>
          {userState && userState.username ? (
            <Button className='logoutButton' onClick={logoutHandler}>
              {' '}
              Logout{' '}
            </Button>
          ) : null}
          {window.location.pathname !== '/aboutus' ? (
            <Nav.Link href='/aboutus'> About us </Nav.Link>
          ) : (
            <Nav.Link href='/'> Main Page </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
