import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import SearchFilterModal from "./SearchFilterModal";

export default class SearchForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        query: "",
        filter: {
          district: "Semua",
          star: "Semua"
        },
        showFilter: false
      };
  }

  handleFilterChange = (district, star) => {
    this.setState({ filter: { district: district, star: star } });
  }

  render() {
    return (
      <React.Fragment>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const query = this.state.query;
            const district = this.state.filter.district;
            const star = this.state.filter.star;
            this.props.onSubmit(query, district, star);
          }}
        >
          <Form.Group as={Row} controlId="formGroupSearch">
            <Col sm={8}>
              <Form.Control 
                type="text" size="lg" placeholder="Cari Hotel" 
                onChange={(event) => {this.setState({ query: event.target.value });}}
              />
            </Col>
            <Col sm={2} className="d-flex justify-content-end">
              <Button variant="primary" type="submit" size="lg">
                Search
              </Button>
            </Col>
            <Col sm={2} className="d-flex justify-content-end">
              <Button
                variant="primary" size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ showFilter: true });}}
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