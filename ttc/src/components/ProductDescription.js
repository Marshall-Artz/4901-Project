import React, { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import CustomSyntaxHighlighter from './CustomSyntaxHighlighter';
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import Draggable from "react-draggable";
import TextareaAutosize from "react-textarea-autosize";
// import { neonTomorrow } from './neonTomorrow';

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
        
        this.setState({ codeDescription: formDataObj.productName });
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
      prompt: `IMPORTANT: Please do not include any personal information, such as names, emails, phone numbers, or other identifying details. Keep all examples and descriptions generic. This is for privacy and security purposes. Thank you. I have a code snippet and a description. Please explain the syntax of the code and why it works in a way that someone who doesn't understand how to read code can comprehend. Break down the explanation into smaller parts, such as the purpose of each line or block of code, the role of certain variables, and the relationship between different parts of the code. Use the actual code lines in your explanation wherever appropriate, and surround each code line or expression with backticks.\n\nCode Snippet:\n${response}\n\nDescription: ${codeDescription}\n\nDetailed Syntax Explanation:\n\nExample: "In the line \`{code_line}\`, it initializes a variable named... This variable is used later in the code to..."\n`,
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
    const { model, heading, response, aiActivated, codeDescription, codeExplanation } = this.state;
  
    return (
      <div style={{ backgroundColor: "#0a0a0a", color: "#00FFFF" }}>
        <Container>
          <br/>
          <br/>
          <br/>

          <h1 style={{ fontFamily: "Verdana", fontSize: "32px", textTransform: "uppercase" }}>Welcome to text-TO-code</h1>
          <br/>
          <br/>
          <br/>
          <div style={{ display: "flex" }}>
            <Form onSubmit={this.onFormSubmit} style={{ flex: 1 }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Draggable>
                  <Resizable width={300} height={350} onResizeStop={(e, data) => { console.log("Resized to", data.size); }}>
                    <div className="input-container" style={{borderRadius:'5px', display: "flex", flexDirection: "column", resize:'both',position: "relative", width: "100%" ,border:"1px solid #dfdfdf"}}>
                      <Form.Control as={TextareaAutosize} minRows={3} name="productName" placeholder="Insert TEXT you would like to convert to CODE" style={{ resize:'both',backgroundColor: "#000000", color: "#00FFFF", verticalAlign: "top", outline: "none", resize: "none", width: "100%", height: "100%", marginRight: 10, border: "none", fontFamily: "Arial, Helvetica, sans-serif", '::placeholder': { color: 'aqua' } }} onChange={this.handleDescriptionChange} />
                      <div style={{ position: "absolute", right: 25, top: 10 }}>
                        <Button variant="dark" size="lg" type="submit" style={{backgroundColor: 'black', borderColor: 'aqua', border: '1px solid aqua'}}>Launch AI</Button>
                      </div>
                    </div>
                  </Resizable>
                </Draggable>
              </Form.Group>
            </Form>
            <div style={{ width: 50 }} />
            <div style={{ flex: 1 }}>
              <Draggable>
              <Card style={{ backgroundColor: "#000000", color: "#ffffff", height: "100%" ,border:"1px solid #dfdfdf"}}>
                <Card.Body style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              

                  <Card.Title style={{fontSize:'32px'}}>{heading}</Card.Title>
                  <hr />
                  <Card.Text style={{ fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace", fontSize: "16px", whiteSpace: "pre-wrap", wordWrap: "break-word", lineHeight: "1.5", flex: 1 }}>
                                  
                  </Card.Text>
                </Card.Body>
              </Card>
              </Draggable>
            </div>
          </div>
          {aiActivated && (
          

            <div div className="output-container">
              <br/>
              <br/>
              <Form onSubmit={this.onExplainSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Button variant="dark" size="lg" type="submit" style={{backgroundColor: 'black', borderColor: 'aqua', border: '1px solid aqua'}}>Smart Tips</Button>
                </Form.Group>
              </Form>
              <Card style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}>
                <Card.Body>                  
                  <hr />
                  <Card.Text style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif", fontSize: "12px" }}>
                
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </Container>
        <br/><br/><br/><br/>
      </div>
    );
  }
} 
export default ProductDescription;