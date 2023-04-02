import React from "react";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"; // import the Link component from React Router
import logo from "../logo.png";


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNavOption: "home", // set the default active option
    };
    this.handleNavOptionClick = this.handleNavOptionClick.bind(this);
  }

  handleNavOptionClick(option) {
    this.setState({ activeNavOption: option }); 
  }

  render() {
    return (
      <div>
        <Navbar
          bg="dark"
          variant="dark"
          sticky="top"
          expand="md"
          collapseOnSelect
        >
          <Navbar.Brand href="/">
            <img alt={"logo"} src={logo} width="50px"/>
            
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav>
              <Nav.Link
                as={Link} 
                to="/" 
                active={this.state.activeNavOption === "home"} 
                onClick={() => this.handleNavOptionClick("home")} 
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link} 
                to="/products-description" 
                active={this.state.activeNavOption === "code"} 
                onClick={() => this.handleNavOptionClick("code")} 
              >
                Code Display
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
