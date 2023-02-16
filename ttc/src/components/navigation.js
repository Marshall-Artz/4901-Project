import React from "react"
import { Component } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'
import logo from '../logo.svg';


// ADD LOGO ABOVE 'text TO code'
// <img src = {logo} width="50px" />

class Navigation extends Component{
    render() {
        return(
            <div>
                <Navbar bg = "dark" variant="dark" sticky="top" expand="md" collapseOnSelect>
                <Navbar.Brand href="/">
                <img src = {logo} width="50px" />
                    text TO code
                </Navbar.Brand>

                    <Navbar.Toggle />

                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href="products-description"> Product Description </Nav.Link>
                            <Nav.Link href="cold-emails"> Cold Emails </Nav.Link>
                            <Nav.Link href="products-description"> Tweets </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </div>
        )
    }
}

export default Navigation