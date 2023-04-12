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
      heading: "AI Output Shown Below",
      response: "... awaiting input ...",
      aiActivated: false,
      showRerunButton: false,
      spinnerHidden: true,
      spinnerHidden2: true,
      syntaxHighlighterHidden: false,
      darkMode: true, // Added darkMode state
    };
    this.cache = new LRU({ max: 100 });
  }

  handleModeChange = () => { // Added handleModeChange function
    this.setState({ darkMode: !this.state.darkMode });
  };

  onFormSubmit = (e) => {
    this.setState({ response: "", spinnerHidden: false, syntaxHighlighterHidden: true }); // Loading Message & Spinner
    e.preventDefault();
    const form = e.target.closest("form"); // Add this line
    const formDataObj = Object.fromEntries(new FormData(form).entries()); // Update this line
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
        heading: `AI Returns . . .`,
        response: filteredResponse,
        aiActivated: true,
        showRerunButton: true,
      }, () => {
        this.setState({ codeDescription: formDataObj.productName, spinnerHidden: true, syntaxHighlighterHidden: false });
      });
    });
  };

  onExplainSubmit = (e) => {
    this.setState({ spinnerHidden2: false }); // Loading Message & Spinner
    e.preventDefault();
    const { response, codeDescription } = this.state;
    if (!codeDescription) return;
    const configuration = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);
    openai.createCompletion({
      model: "text-davinci-003",
      prompt: `IMPORTANT: Please do not include any personal information, such as names, emails, phone numbers, or other identifying details. Keep all examples and descriptions generic. This is for privacy and security purposes. Thank you. I have a code snippet and a description. Please explain the syntax of the code and why it works in a way that someone who doesn't understand how to read code can comprehend. IMPORTANT: BE VERY CONCISE. IMPORTANT: IMAGINE YOU ARE LISTING BULLET POINTS WORTH OF INFO, NOT FULL SENTENCES! COLOR CORDINATE EACH INVIDUAL VARIABLE. Break down the explanation into smaller parts\n such as the purpose of each line or block of code\n the role of certain variables\n and the relationship between different parts of the code\n Use the actual code lines in your explanation wherever appropriate.\n\nCode Snippet:\n${response}\n\nDescription: ${codeDescription}\n\nDetailed Syntax Explanation:\n\nExample: "Initialize a variable named \`{variable_name}\`... This variable is used later in the code to..."\n`,
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }).then((response) => {
      this.setState({ codeExplanation: response.data.choices[0].text, spinnerHidden2: true, syntaxHighlighterHidden: false });
    });
  };

  render() {
    const { heading, response, aiActivated, codeExplanation, darkMode } = this.state;
    return (
      <div style={{ backgroundColor: darkMode ? "#0a0a0a" : "#f4f4f4", color: darkMode ? "#00FFFF" : "#0d47a1" }}>
        <Container>
          <div style={{ position: "fixed", top: "100px", right: "30px", textAlign: "center" }}>
            <button onClick={this.handleModeChange} className="btn btn-dark" style={{ borderColor: darkMode ? "aqua" : "#0d47a1", color: darkMode ? "white" : "#0d47a1" }}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <br /><br /><br />
          <h1 style={{ fontFamily: "Verdana", fontSize: "32px", textTransform: "uppercase" }}>Welcome to text-TO-code</h1>
          <br /><br /><br />
          <div style={{ display: "flex" }}>
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
                    <div
                      className={`input-container ${darkMode ? "dark-mode" : "light-mode"}`}
                      style={{
                        borderRadius: '5px',
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        height: "100%",
                        width: "100%",
                        border: "1px solid #dfdfdf",
                      }}
                    >
                      <h2 style={{ color: darkMode ? "#00FFFF" : "#0d47a1", textAlign: 'left' }}>Input Text</h2>
                      <Form.Control
                        as={TextareaAutosize}
                        minRows={16}
                        name="productName"
                        placeholder="Insert TEXT you would like to convert to CODE"
                        className="input-textarea" // Add this line
                        style={{
                          backgroundColor: darkMode ? "#2d2d2d" : "#ffffff",
                          color: darkMode ? "#ffffff" : "#000000",
                          verticalAlign: "top",
                          outline: "none",
                          resize: "none",
                          width: "100%",
                          height: "100%",
                          marginRight: 10,
                          border: "none",
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                        onChange={this.handleDescriptionChange}
                      />
                      <div style={{ position: "absolute", right: 10, top: 10 }}>
                        <Button
                          variant="dark" size="lg"
                          type="button"
                          className="btn btn-dark"

                          style={{
                            fontFamily: 'Lato, sans-serif', // set the fontFamily property
                            fontSize: '18px',
                            width: "150px",
                            backgroundColor: darkMode ? 'black' : 'white',
                            borderColor: darkMode ? 'aqua' : '#aqua',
                            color: darkMode ? 'white' : 'black',
                            //padding: '10px 40px'
                          }}
                          onClick={(e) => this.onFormSubmit(e)} // Update this line

                        >Activate AI</Button>
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
                  <Card style={{
                    backgroundColor: darkMode ? "#000000" : "#ffffff", // Change this line
                    border: darkMode ? "1px solid #ffffff" : "1px solid #dfdfdf",
                    color: darkMode ? "cyan" : "#0d47a1",
                    height: "100%",
                    borderRadius: "none"
                  }}>

                    <Card.Body>
                      <Card.Title>
                        <h1>{heading}</h1>
                      </Card.Title>
                      <Card.Text style={{ fontFamily: 'Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace', fontSize: '14px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: '1.5', height: "100%" }}>

                        <SyntaxHighlighter language="javascript" style={darkMode ? neonTomorrow : undefined} hidden={this.state.syntaxHighlighterHidden}>
                          {response}
                        </SyntaxHighlighter>

                        <div className="spinner-container">
                          <Spinner animation="border" color="#00FFFF" role="status" hidden={this.state.spinnerHidden}>
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Resizable>
              </Draggable>
            </div>
          </div>
          {aiActivated && (
            <div className={`output-container ${darkMode ? "dark-mode" : "light-mode"}`}>
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
                  <Card style={{
                    backgroundColor: darkMode ? "#000000" : "#ffffff", // Change this line
                    border: darkMode ? "1px solid #ffffff" : "1px solid #dfdfdf",
                    color: darkMode ? "cyan" : "#0d47a1",
                    height: "100%",
                    borderRadius: "none"
                  }}>

                    <Card.Body style={{ borderRadius: '1px', display: "flex", flexDirection: "column", resize: 'both', position: "relative", width: "100%", height: "100%", border: "1px solid #dfdfdf" }}>
                      <Form onClick={(e) => this.onExplainSubmit(e)}
                      >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Button
                            variant="dark" size="lg"
                            type="button"
                            className="btn btn-dark"
                            style={{
                              fontFamily: 'Lato, sans-serif',
                              fontSize: '18px',
                              width: "150px",
                              backgroundColor: darkMode ? 'black' : 'white',
                              borderColor: darkMode ? 'aqua' : '#0d47a1',
                              color: darkMode ? 'white' : 'black',
                              position: 'absolute', // Add this line
                              top: 10,               // Add this line
                              right: 10,             // Add this line
                            }}>
                            Smart Tips
                          </Button>
                        </Form.Group>
                      </Form>
                      <Card.Title>
                        <h1>Smart Tips</h1>

                      </Card.Title>
                      <hr /><br />
                      <Card.Text style={{ fontFamily: 'Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace', fontSize: '14px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: '1.5', height: "100%" }}>
                        <Spinner animation="border" role="status" color="#00FFFF" hidden={this.state.spinnerHidden2}>
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <SyntaxHighlighter language="javascript" style={darkMode ? neonTomorrow : undefined}>
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

