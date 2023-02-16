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
                    <h1>Text to Code with OpenAI</h1>
                    <p>Input text in the field</p>
                    <br/>
                    <br/>
                    <Row>
                        <Col>
                            <Display
                            header = "Product Descriptions"
                            title = "Generate Prod Desc"
                            text = "This platform will take your text and convert it to code"
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