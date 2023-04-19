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
            fontFamily: "Lato, sans-serif", // set the fontFamily property
            fontSize: "32px",
            fontWeight: "bold",
            color: darkMode ? "aqua" : "#0d47a1",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Welcome to codeMe
        </h1>
        <p style={{ textAlign: "center", color: darkMode ? "aqua" : "#0d47a1" }}>Powered by OpenAI</p>
        <div className="imgholder" style={{ textAlign: "center"}}>
          <img alt="img" src={logo} style={{ backgroundColor: darkMode ? "aqua" : "#0d47a1", borderRadius: 30 }} width="400px" />
        </div>
        <hr className="my-4" style={{ borderColor: darkMode ? "aqua" : "#0d47a1" }} />
        <div className="container" style={{ textAlign: "center" }}>
          <h3
            style={{
              fontFamily: "Lato, sans-serif", // set the fontFamily property
              fontSize: "26px",
              fontWeight: "bold",
              color: darkMode ? "aqua" : "#0d47a1",
              marginBottom: "20px",
            }}
          >
            Learn how to write, edit, and think in code
          </h3>
          <p
  style={{
    fontFamily: "Lato, sans-serif", // set the fontFamily property
    fontSize: "18px",
    color: darkMode ? "white" : "black",
    lineHeight: "1.5",
    textAlign: "justify", // add the textAlign property
  }}
>
CodeMe, the innovative platform that transforms your written text into functional code! Our comprehensive educational tool caters to programmers of all levels, from aspiring novices to seasoned experts. With codeMe, not only can you effortlessly convert your text to code, but you can also benefit from our vast database of useful tips and insights. Our in-depth analysis and detailed explanations offer a unique and sophisticated learning experience that will take your coding skills to the next level. Click the button below to embark on a new and exciting coding journey with codeMe. Get ready to discover the endless possibilities of coding and unlock your true potential. Happy learning, happy coding!

</p>
          <br/>
          <Link to="/products-description">
            <button 
              type="button" 
              className="btn btn-dark" 
              style={{
                fontFamily: 'Lato, sans-serif', // set the fontFamily property
                fontSize : '18px', 
                backgroundColor: darkMode ? 'black' : 'white',
                borderColor: darkMode ? 'aqua' : '#0d47a1',
                color: darkMode ? 'white' : 'black',
                padding: '10px 40px'
              }}
            >
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
          <button onClick={handleModeChange} className="btn btn-dark" style={{borderColor: darkMode ? "#0d47a1" : "aqua", color: darkMode ? "black" : "white", backgroundColor: darkMode ? "white" : "black"}}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
                </Container>
            </div>
        )
    }


export default Home