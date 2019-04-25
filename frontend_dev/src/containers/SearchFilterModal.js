import React, { Component } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";

export default class SearchFilterModal extends Component {
  constructor(props) {
      super(props);

      this.state = {
        city: "Semua",
        star: "Semua"
      };

      this.cities = [
        "Semua", "Kota Bandung", "Kabupaten Bandung"
      ]

      this.stars = [
        // "Non-Bintang", "1", "2", "3", "4", "5"
        "Semua", "1", "2", "3", "4", "5"
      ]
  }

  handleHide = () => {
    this.props.onChange(this.state.city, this.state.star);
    this.props.onHide();
  }

  render() {
    const cityOptions = this.cities.map((city) =>
      city === this.state.city ? (
        <option selected>{city}</option>
      ) : (
        <option>{city}</option>
      )
    );

    const starOptions = this.stars.map((star) => 
      star === this.state.star ? (
        <option selected>{star}</option>
      ) : (
        <option>{star}</option>
      )
    );

    return (
      <Modal 
        show={this.props.show} 
        onHide={this.handleHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Col sm={1} />
              <Form.Label column sm={3}>
                Kabupaten/Kota
              </Form.Label>
              <Col sm={6}>
                <Form.Control 
                  as="select"
                  onChange={(event) => {this.setState({ city: event.target.value });}}
                >
                  {cityOptions}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Col sm={1} />
              <Form.Label column sm={3}>
                Bintang
              </Form.Label>
              <Col sm={6}>
              <Form.Control 
                as="select"
                onChange={(event) => {this.setState({ star: event.target.value });}}
              >
                {starOptions}
              </Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}