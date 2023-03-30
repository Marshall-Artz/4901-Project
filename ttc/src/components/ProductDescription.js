import React from "react";
import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
const { Configuration, OpenAIApi } = require("openai");
const LRU = require("lru-cache");

class ProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      model: "text-davinci-003",
      heading: "AI Output shown below",
      response: "... awaiting input ...",
      aiActivated: false, // track whether AI has been activated
      showRerunButton: false // track whether to show the 'rerun' button
    };
    this.cache = new LRU({ max: 100 });
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) {
      console.error("Invalid form element");
      return;
    }

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj.productName);

    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion({
        model: this.state.model,
        prompt: formDataObj.productName,
        temperature: 0.5,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        this.setState({
          heading: `AI TTC output below`,
          response: `${response.data.choices[0].text}`,
          aiActivated: true,
          showRerunButton: true // set showRerunButton to true after AI has been activated
        });
      });
  };

  switchModel = (newModel, event = null) => {
    this.setState({ model: newModel, showRerunButton: true }, () => {
      // re-run the form submission with the new model
      if (event && event.target instanceof HTMLFormElement) {
        event.preventDefault();
        this.onFormSubmit(event);
      } else {
        const form = document.querySelector("form");
        if (form) {
          const newEvent = new Event("submit", { bubbles: true });
          Object.defineProperty(newEvent, "target", {
            value: form,
            enumerable: true,
          });
          form.dispatchEvent(newEvent);
        } else {
          console.error("Form element not found");
        }
      }
    });
  };
  
  
  render() {
    const { model, heading, response, aiActivated, showRerunButton } = this.state;
  
    return (
      <div>
        <Container>
          <br />
          <br />
          <h1>Welcome to text-TO-code</h1>
          <br />
          <br />
          <br />
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Insert TEXT you would like to convert to CODE</Form.Label>
              <Form.Control type="text" name="productName" placeholder="Enter Text" />
              <Form.Text className="text-muted">You can be as simple / detailed as you like!</Form.Text>
            </Form.Group>
            <Button variant="primary" size="lg" type="submit">
              Launch AI
            </Button>

            
          </Form>
  
          <br />
          <br />
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>{heading}</h1>
              </Card.Title>
              <hr />
              <br />
              <Card.Text>
                <h4>{response}</h4>
              </Card.Text>
            </Card.Body>
          </Card>

        </Container>
  
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
  
}
    
    export default ProductDescription;