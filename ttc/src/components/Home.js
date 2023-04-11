import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "./Home.css";

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);

  const handleModeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={{ backgroundColor: darkMode ? "#0a0a0a" : "#f4f4f4" }}>
      <Container style={{ backgroundColor: darkMode ? "#0a0a0a" : "#f4f4f4" }}>
        <br />
        <br />
        <h1
          style={{
            fontFamily: "Verdana",
            fontSize: "32px",
            textTransform: "uppercase",
            color: "aqua",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Welcome to text-TO-code
        </h1>
        <p style={{ textAlign: "center", color: "aqua" }}>Powered by OpenAI</p>
        <br />
        <br />
        <div className="imgholder" style={{ textAlign: "center" }}>
          <img alt="img" src={logo} style={{ backgroundColor: "aqua" }} width="400px" />
        </div>
        <br />
        <br />
        <hr className="my-4" style={{ borderColor: "aqua" }} />
        <div className="container" style={{ textAlign: "center" }}>
          <h3
            style={{
              fontFamily: "Verdana",
              fontSize: "26px",
              color: "aqua",
              marginBottom: "20px",
            }}
          >
            Learn how to write, edit, and think in code
          </h3>

          <p
            style={{
              fontFamily: "Verdana",
              fontSize: "18px",
              color: darkMode ? "white" : "black",
              lineHeight: "1.5",
            }}
          >
            This platform will take your text and convert it into code. TTC is a supplemental educational tool that can help programmers of all levels (beginner - experienced). TTC not only converts your text to code, but it will also provide relevant tips on your prompts and elaborate on the code itself; describing how it works. Click the button below to begin! Happy learning, happy coding.
          </p>
          <br/>
                        <Link to="/products-description">
                            <button 
                                type="button" 
                                className="btn btn-dark" 
                                style={{
                                    fontFamily:'Verdana',
                                    fontSize : '18px', 
                                    backgroundColor: darkMode ? 'black' : 'white',
                                    borderColor: 'aqua', 
                                    color: darkMode ? 'white' : 'black',
                                    padding: '10px 40px'
                                }}>
                                Get Started
                            </button>  
                        </Link>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{position: 'fixed', top: '100px', right: '30px', textAlign: 'center'}}>
          <button onClick={handleModeChange} className="btn btn-dark" style={{borderColor: 'aqua', color: 'aqua'}}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
                </Container>
            </div>
        )
    }


export default Home