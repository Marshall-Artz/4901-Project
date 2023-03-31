import React from "react"
import { Component } from "react"
import { Container, Row, Col, Carousel } from "react-bootstrap"
import Display from "./Display"
import logo from "../logo.svg"


class Home extends Component{
    render() {
        return (
            <div>
                <br/>
                <Container>
                    <Carousel>
                        <Carousel.Item>

                        </Carousel.Item>
                    </Carousel>
                    <br/>
                    <br/>
                    <h1 style={{fontFamily:'Verdana',fontSize : '32px',textTransform: 'uppercase'}}>Welcome to text-TO-code</h1>
                    <p>Powered by OpenAI</p>
                    <br/>
                    <br/>
                    <div className="imgholder">
                        <img alt={"img"} src={logo} width="400px"/>
                    </div>
                    <br/>
                    <br/>
                    <hr className="my-4"/>
                    <div className="container">
                    <h3 style={{fontFamily:'Verdana',fontSize : '26px'}}> Learn how to write edit and think in code</h3>
                    
                    <p style={{fontFamily:'Verdana',fontSize : '18px'}}>
                    This platform will take your text and convert it into code. TTC is a supplemental educational tool that can help programmers of all levels (beginner - experienced). TTC not only converts your text to code, but it will also provide relevant tips on your prompts and elaborate on the code itself; describing how it works. Click the button below to begin! Happy learning, happy coding.
                        
                    </p>
                    <a href="/products-description">
                 
                    <button theLink = "/products-description" type="button" class="btn btn-dark" style={{fontFamily:'Verdana',fontSize : '18px'}}>Get Started </button>  
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