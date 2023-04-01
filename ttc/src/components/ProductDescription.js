import React from "react";
import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
const { Configuration, OpenAIApi } = require("openai");
const LRU = require("lru-cache");

class ProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      model: "text-davinci-003",
      heading: "AI Output shown below",
      response: "... awaiting input ...",
      aiActivated: false,
      showRerunButton: false,
      codeDescription: "",
      codeExplanation: "",
    };
    this.cache = new LRU({ max: 100 });
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj.productName);

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion({
        model: this.state.model,
        prompt: formDataObj.productName,
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        this.setState(
          {
            heading: `AI TTC output below`,
            response: `${response.data.choices[0].text}`,
            aiActivated: true,
            showRerunButton: true,
          },
          () => {
            this.setState({ codeDescription: formDataObj.productName });
          }
        );
      });
  };

  onExplainSubmit = (e) => {
    e.preventDefault();
    this.explainCode(this.state.response);
  };

  explainCode = (codeSnippet) => {
    const { codeDescription } = this.state;
    if (!codeDescription) {
      return;
    }
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
  
    openai
      .createCompletion({
        model: "text-davinci-002",
        prompt: `I have a code snippet and a description. Please explain the syntax of the code and why it works in a way that someone who doesn't understand how to read code can comprehend.\n\nCode Snippet:\n${codeSnippet}\n\nDescription: ${codeDescription}\n\nSyntax Explanation:`,
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        const explainCodeResponse = response.data.choices[0].text;
        console.log("Explain Code Response:", explainCodeResponse);
        this.setState({ codeExplanation: explainCodeResponse });
      });
  };
  
  
  render() {
    const { model, heading, response, aiActivated, showRerunButton, codeDescription, codeExplanation } = this.state;
  
    return (
      <div>
        <Container>
          <br />
          <br />
          <h1 style={{ fontFamily: "Verdana", fontSize: "32px", textTransform: "uppercase" }}>Welcome to text-TO-code</h1>
          <br />
          <br />
          <br />
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontFamily: "Verdana", fontSize: "18px" }}>Insert TEXT you would like to convert to CODE</Form.Label>
              <Form.Control as="textarea" rows={4} name="productName" placeholder="Enter Text" style={{ backgroundColor: "#000000", color: "#ffffff", verticalAlign: "top", outline: "none", resize: "none" }} onChange={this.handleDescriptionChange} />
              <Form.Text className="text-muted">You can be as simple / detailed as you like!</Form.Text>
            </Form.Group>
            <Button variant="primary" size="lg" type="submit">
              Launch AI
            </Button>
          </Form>
  
          <br />
          <br />
          <Card style={{ backgroundColor: "#000000", color: "#ffffff" }}>
            <Card.Body>
              <Card.Title>
                <h1>{heading}</h1>
              </Card.Title>
              <hr />
              <br />
              <Card.Text style={{ fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace", fontSize: "16px", whiteSpace: "pre-wrap", wordWrap: "break-word", lineHeight: "1.5" }}>
                <SyntaxHighlighter language="javascript" style={tomorrow}>
                  {response}
                </SyntaxHighlighter>
              </Card.Text>
            </Card.Body>
          </Card>
  
          {aiActivated && (
            <div>
              <br />
              <br />
              <Form onSubmit={this.onExplainSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ fontFamily: "Verdana", fontSize: "18px" }}>Explain the code</Form.Label>
                  <Button variant="primary" size="lg" type="submit">
                    Explain
                  </Button>
                </Form.Group>
              </Form>
  
              <br />
              <br />
              <Card style={{ backgroundColor: "#000000", color: "#ffffff" }}>
                <Card.Body>
                  <Card.Title>
                    <h1>Explanation</h1>
                  </Card.Title>
                  <hr />
                  <br />
                  <Card.Text style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif", fontSize: "16px" }}>
                    {codeExplanation}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </Container>
  
        <br /><br /><br /><br />
      </div>
    );
  }
} 
export default ProductDescription;