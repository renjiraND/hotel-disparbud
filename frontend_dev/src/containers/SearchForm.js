import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import SearchFilterModal from "./SearchFilterModal";

export default class SearchForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        query: "",
        filter: {
          city: "",
          star: 3
        },
        showFilter: false
      };
  }

  handleFilterChange = (city, star) => {
    this.setState({ filter: { city: city, star: star } });
    alert("filter " + city + " " + star);
  }

  render() {
    return (
      <React.Fragment>
        <Form
          onSubmit={() => {
            this.props.onSubmit(this.state.query);
          }}
        >
          <Form.Group as={Row} controlId="formGroupSearch">
            <Col sm={8}>
              <Form.Control 
                type="text" size="lg" placeholder="Cari Hotel" 
                onChange={(event) => {this.setState({ query: event.target.value });}}
              />
            </Col>
            <Col sm={2} className="d-flex justify-content-center">
              <Button variant="primary" type="submit" size="lg">
                Search
              </Button>
            </Col>
            <Col sm={2} className="d-flex justify-content-start">
              <Button 
                variant="primary" size="lg"
                onClick={() => {this.setState({ showFilter: true });}}
              >
                Add Filter
              </Button>
            </Col>
          </Form.Group>
        </Form>

        <SearchFilterModal 
          show={this.state.showFilter}
          onHide={() => {this.setState({ showFilter: false });}}
          onChange={this.handleFilterChange}
        />
      </React.Fragment>
    );
  }
}