import React from "react"
import { Component, setState } from "react"
import { Container, Form, Button, Cerd, Card } from "react-bootstrap"
const { Configuration, OpenAIApi } = require("openai");

class ProductDescription extends Component{

    constructor() {
    super()
        this.state = {
            heading: 'The Response From The AI Will Be Shown Here',
            Response: '... awaiting response ...'
        }
    }

    onFormSubmit = e => {
        e.preventDefault()

        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj.productName)

        const configuration = new Configuration({
            apiKey: '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',
        });
            const openai = new OpenAIApi(configuration);

        openai.createCompletion({
            model: "text-davinci-003",
            prompt: "write code in javascript that calculates the area of a sphere",
            temperature: 0.5,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        .then((response) => {
            this.setState({
                heading: `AI Produces... ${formDataObj.productName}`,
                response: `${response.data.choices[0].text}`
            })
        });

}
    render() {
        return (
            <div>
                <Container>
                    <br/>
                    <br/>
                    <h1>This is the ProductDescription page</h1>
                    <br/>
                    <h4>Insert TEXT you would like to convert to code</h4>
                    <br/>
                    <br/>
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>What would you like to convert</Form.Label>
                            <Form.Control
                                type="text"
                                name="ProductName"
                                placeholder="Enter TexT" />
                                <Form.Text className="text-muted">
                                    Enter specific text bellow
                                </Form.Text>
                        </Form.Group>

                    <Button varient = "primary" size="lg" type="submit">
                        Launch AI
                    </Button>

                    </Form>

                    <br/>
                    <br/>
                <Card>

                    <Card.Body>
                        <Card.Title><h1>{this.state.heading}</h1></Card.Title>
                        <hr/>
                        <br/>
                        <Card.Text>
                            <h4>{this.state.response}</h4>
                        </Card.Text>
                    </Card.Body>

                </Card>
                </Container>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
            </div>
    
            )}
        } 

export default ProductDescription