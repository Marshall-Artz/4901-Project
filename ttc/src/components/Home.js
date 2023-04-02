import React from "react"
import { Component } from "react"
import { Container, Row, Col, Carousel } from "react-bootstrap"
import Display from "./Display"
import logo from "../logo.svg"


class Home extends Component{
    render() {
        return (
            <div style={{backgroundColor:'#0a0a0a'}}>
                <Container style={{ backgroundColor: '#0a0a0a' }}>
                    <br/>
                    <br/>
                    <h1 style={{fontFamily:'Verdana',fontSize : '32px',textTransform: 'uppercase', color: 'aqua', textAlign: 'center', marginBottom: '10px'}}>Welcome to text-TO-code</h1>
                    <p style={{textAlign: 'center', color: 'aqua'}}>Powered by OpenAI</p>
                    <br/>
                    <br/>
                    <div className="imgholder" style={{textAlign: 'center'}}>
                        <img alt="img" src={logo} style={{ backgroundColor: "aqua" }} width="400px" />
                    </div>
                    <br/>
                    <br/>
                    <hr className="my-4" style={{borderColor: 'aqua'}} />
                    <div className="container" style={{textAlign: 'center'}}>
                        <h3 style={{fontFamily:'Verdana',fontSize : '26px', color: 'aqua', marginBottom: '20px'}}>Learn how to write, edit, and think in code</h3>
                        
                        <p style={{fontFamily:'Verdana',fontSize : '18px', color: 'white', lineHeight: '1.5'}}>
                            This platform will take your text and convert it into code. TTC is a supplemental educational tool that can help programmers of all levels (beginner - experienced). TTC not only converts your text to code, but it will also provide relevant tips on your prompts and elaborate on the code itself; describing how it works. Click the button below to begin! Happy learning, happy coding.
                        </p>
                        <br/>
                        <a href="/products-description">
                        <button 
                            theLink="/products-description" 
                            type="button" 
                            className="btn btn-dark" 
                            style={{
                            fontFamily:'Verdana',
                            fontSize : '18px', 
                            backgroundColor: 'black', 
                            borderColor: 'aqua', 
                            color: 'white',
                            padding: '10px 40px'
                            }}
                        >
                            Get Started
                        </button>  
</a>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Container>
            </div>
        )
    }
}

export default Home
