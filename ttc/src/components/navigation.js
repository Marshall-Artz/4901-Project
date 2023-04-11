import React from "react"
import { Component } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from "../logo.svg"

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="md" sticky="top">
        <Navbar.Brand>
          <img alt={"logo"} style={{ backgroundColor: "aqua", marginLeft: '20px', marginRight: '20px'}} src={logo} width="50px" className="mr-3" />
          <span className="navbar-text">Text-To-Code</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/products-description" className="nav-link" activeClassName="active">Code Display</NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
