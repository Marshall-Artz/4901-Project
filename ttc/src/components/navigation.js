import React from "react"
import { Component } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'
import logo from '../logo.png';


// ADD LOGO ABOVE 'text TO code'
// <img src = {logo} width="50px" />

class Navigation extends Component{
    render() {
        return(
            <div>
                <Navbar bg = "dark" variant="dark" sticky="top" expand="md" collapseOnSelect>
                <Navbar.Brand href="/">
                <img alt={"logo"} src = {logo} width="50px" />
                   &nbsp;&nbsp;&nbsp; Home
                </Navbar.Brand>

                    <Navbar.Toggle />

                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href="products-description"> Code Display</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </div>
        )
    }
}

export default Navigation