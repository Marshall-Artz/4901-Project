import React, { Component } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";
import TextareaAutosize from "react-textarea-autosize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { neonTomorrow } from "./neonTomorrow";
import "./PD.css"
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
      spinnerHidden: true,
      syntaxHighlighterHidden: false,
    };
    this.cache = new LRU({ max: 100 });
  }

  onFormSubmit = (e) => {
    this.setState({ response: "", spinnerHidden: false, syntaxHighlighterHidden: true}); // Loading Message & Spinner
    e.preventDefault();
    const formDataObj = Object.fromEntries(new FormData(e.target).entries());
    const configuration = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);
    openai.createCompletion({
      model: this.state.model,
      prompt: formDataObj.productName,
      temperature: 0.25,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }).then((response) => {
      // Apply filter to response
      const filteredResponse = response.data.choices[0].text.replace(/PERSONAL_INFO_REGEX/g, "*****");
      this.setState({
        heading: `AI TTC output below`,
        response: filteredResponse,
        aiActivated: true,
        showRerunButton: true,
      }, () => {
        this.setState({ codeDescription: formDataObj.productName, spinnerHidden: true, syntaxHighlighterHidden: false});
      });
    });
  };

  onExplainSubmit = (e) => {
    e.preventDefault();
    const { response, codeDescription } = this.state;
    if (!codeDescription) return;
    const configuration = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);
    openai.createCompletion({
      model: "text-davinci-003",
      prompt: `IMPORTANT: Please do not include any personal information, such as names, emails, phone numbers, or other identifying details. Keep all examples and descriptions generic. This is for privacy and security purposes. Thank you. I have a code snippet and a description. Please explain the syntax of the code and why it works in a way that someone who doesn't understand how to read code can comprehend. Break down the explanation into smaller parts, such as the purpose of each line or block of code, the role of certain variables, and the relationship between different parts of the code. Use the actual code lines in your explanation wherever appropriate, and surround each code line or expression with backticks.\n\nCode Snippet:\n${response}\n\nDescription: ${codeDescription}\n\nDetailed Syntax Explanation:\n\nExample: "Initialize a variable named \`{variable_name}\`... This variable is used later in the code to..."\n`,
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }).then((response) => {
      this.setState({ codeExplanation: response.data.choices[0].text });
    });
  };

  render() {
    const { heading, response, aiActivated, codeExplanation } = this.state;
    return (
      <div style={{ backgroundColor: "#0a0a0a", color: "#00FFFF" }}>
        <Container>
          <br /><br /><br />
          <h1 style={{ fontFamily: "Verdana", fontSize: "32px", textTransform: "uppercase" }}>Welcome to text-TO-code</h1>
          <br /><br /><br />
          <div style={{ display: "flex", backgroundColor: "#0a0a0a" }}>
            <Form onSubmit={this.onFormSubmit} style={{ flex: 1 }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Draggable>
                  <Resizable
                    width={window.innerWidth / 2 - 30}
                    height={1000}
                    minConstraints={[window.innerWidth / 4, 100]}
                    maxConstraints={[window.innerWidth * 0.75, 500]}
                    onResizeStop={(e, data) => {
                      console.log("Resized to", data.size);
                    }}
                  >
                    <div className="input-container" style={{ borderRadius: '5px', display: "flex", flexDirection: "column", position: "relative", height: "100%", width: "100%", border: "1px solid #dfdfdf" }}>
                      <h2 style={{ color: 'white', textAlign: 'left' }}>Input Text</h2>
                      <Form.Control as={TextareaAutosize} minRows={16} name="productName" placeholder="Insert TEXT you would like to convert to CODE" style={{ backgroundColor: "#2d2d2d", color: "#FFFFFF", verticalAlign: "top", outline: "none", resize: "none", width: "100%", height: "100%", marginRight: 10, border: "none", fontFamily: "Arial, Helvetica, sans-serif", '::placeholder': { color: 'aqua' } }} onChange={this.handleDescriptionChange} />
                      <div style={{ position: "absolute", right: 1, top: 1 }}>
                        <Button variant="dark" size="lg" type="submit" className="submit-button" style={{ width: "150px" }}>Activate AI</Button>
                      </div>
                    </div>

                  </Resizable>
                </Draggable>
              </Form.Group>
            </Form>
            <div style={{ width: 50 }} />
            <div style={{ flex: 1 }}>
              <Draggable>
                <Resizable
                  width={window.innerWidth / 2 - 30}
                  minConstraints={[window.innerWidth / 4, 200]}
                  maxConstraints={[window.innerWidth * 0.75, 800]}
                  onResizeStop={(e, data) => {
                    console.log("Resized to", data.size);
                  }}
                >
                  <Card style={{ backgroundColor: '#000000',border:"1px solid #ffffff", color: '#ffffff', height: "100%",borderRadius:"none" }}>
                    <Card.Body>
                      <Card.Title>
                        <h1>{heading}</h1>
                      </Card.Title>
                      <Card.Text style={{ fontFamily: 'Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace', fontSize: '14px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: '1.5', height: "100%" }}>
                        <SyntaxHighlighter language="javascript" style={(neonTomorrow)} hidden={this.state.syntaxHighlighterHidden}>
                          {response}
                        </SyntaxHighlighter>
                        <Spinner animation="border" role="status" hidden={this.state.spinnerHidden}>
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Resizable>
              </Draggable>
            </div>
          </div>
          {aiActivated && (
            <div div className="output-container" >
              <br /><br />
              <Draggable>
                <Resizable
                  width={window.innerWidth / 2 - 30}
                  minConstraints={[window.innerWidth / 4, 200]}
                  maxConstraints={[window.innerWidth * 0.75, 800]}
                  onResizeStop={(e, data) => {
                    console.log("Resized to", data.size);
                  }}
                >
                  <Card style={{ backgroundColor: '#000000', color: '#ffffff', height: "100%" }}>
                    <Card.Body style={{ borderRadius: '1px', display: "flex", flexDirection: "column", resize: 'both', position: "relative", width: "100%", height: "100%", border: "1px solid #dfdfdf" }}>
                      <Form onSubmit={this.onExplainSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Button variant="dark" size="lg" type="submit" className="submit-button">Smart Tips</Button>
                        </Form.Group>
                      </Form>
                      <Card.Title>
                        <h1>Smart Tips</h1>
                      </Card.Title>
                      <hr /><br />
                      <Card.Text style={{ fontFamily: 'Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace', fontSize: '14px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: '1.5', height: "100%" }}>
                        <SyntaxHighlighter language="javascript" style={(neonTomorrow)}>
                          {codeExplanation}
                        </SyntaxHighlighter>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Resizable>
              </Draggable>
            </div>
          )}
        </Container>
        <br /><br /><br /><br />
      </div>
    );
  }
}
export default ProductDescription;

