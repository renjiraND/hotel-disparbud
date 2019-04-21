import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default class SearchForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: "",
        address: "",
        username: "",
        password: ""
      };
  }

  handleSubmit = () => {
    alert("huyu " 
      + this.state.name + " " 
      + this.state.address + " " 
      + this.state.username + " " 
      + this.state.password);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Input Data Hotel</h1>
        <hr />
        <br />
        <Form
          onSubmit={this.handleSubmit}
        >
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Nama Hotel
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                type="text" placeholder="Nama Hotel"
                onChange={(event) => {this.setState({ name: event.target.value });}}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Alamat
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                type="text" placeholder="Alamat" 
                onChange={(event) => {this.setState({ address: event.target.value });}}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                type="text" placeholder="Username" 
                onChange={(event) => {this.setState({ username: event.target.value });}}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={6}>
              <Form.Control 
                type="password" placeholder="Password" 
                onChange={(event) => {this.setState({ password: event.target.value });}}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={2} />
            <Col sm={10} className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}