import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default class SearchForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
          query: ""
      };
  }

  render() {
    return (
      <React.Fragment>
        <Form>
          <Form.Group controlId="formGroupSearch">
            <Row>
              <Col sm={8}>
                <Form.Control type="text" size="lg" placeholder="Cari Hotel" />
              </Col>
              <Col sm={2} className="d-flex justify-content-center">
                <Button variant="primary" type="submit" size="lg">
                  Search
                </Button>
              </Col>
              <Col sm={2} className="d-flex justify-content-left">
                <Button variant="primary" type="submit" size="lg">
                  Filter
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}