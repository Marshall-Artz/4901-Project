import React from "react"
import { Component } from "react"
import { Container, Row, Col, Carousel } from "react-bootstrap"
import Display from "./Display"

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
                    <h1>Welcome to text-TO-code</h1>
                    <p>Powered by OpenAI</p>
                    <br/>
                    <br/>
                    <Row>
                        <Col>
                            <Display
                            title = "Learn how to write edit and think in code"
                            text = "This platform will take your text and convert it into code. TTC is a supplemental educational tool that can help programmers of all levels (beginner - experienced). TTC not only converts your text to code, but it will also provide relevant tips on your prompts and elaborate on the code itself; describing how it works. Click the button below to begin! Happy learning, happy coding."
                            theLink = "/products-description" />
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                </Container>
            </div>
        )
    }
}

export default Home