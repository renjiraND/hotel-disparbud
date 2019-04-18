import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form, Card } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        return(
          <Card className="w-50 mx-auto LoginCard">
            <Card.Body>
            <Form>
              <div className="row">
                <h2 className="col my-auto">Login</h2>
                <img src="./images/logo-disbudpar.png" alt="image can't be loaded" className="w-25 h-25"></img>
              </div>
              <hr />
              <div>
                <Form.Group controlId="formBasicEmail" className="row mx-auto">
                  <Form.Label className="col-4 my-auto">Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" className="col-8" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="row mx-auto">
                  <Form.Label className="col-4 my-auto">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" className="col-8" />
                </Form.Group>

                {/* <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="Remember my info" />
                </Form.Group> */}
                <Button variant="primary" type="submit" className="float-right">
                  Submit
                </Button>
              </div>
            </Form>
            </Card.Body>
          </Card>
        );
    }
}