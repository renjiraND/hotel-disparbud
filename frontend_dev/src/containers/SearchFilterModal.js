import React, { Component } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";

export default class SearchFilterModal extends Component {
  constructor(props) {
      super(props);

      this.state = {
        district: "Semua",
        star: "Semua"
      };

      this.cities = [
        "Semua", "Kota Bandung", "Kabupaten Bandung"
      ];

      this.stars = [
        // "Non-Bintang", "1", "2", "3", "4", "5"
        "Semua", "1", "2", "3", "4", "5"
      ];
  }

  handleHide = () => {
    this.props.onChange(this.state.district, this.state.star);
    this.props.onHide();
  }

  render() {
    const districtOptions = this.cities.map((district, index) =>
      <option key={index}>{district}</option>
    );

    const starOptions = this.stars.map((star, index) => 
      <option key={index}>{star}</option>
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
          <Modal.Title>Add Fliter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formDistrictField">
              <Col sm={1} />
              <Form.Label column sm={3}>
                Kabupaten/Kota
              </Form.Label>
              <Col sm={6}>
                <Form.Control 
                  as="select"
                  defaultValue={this.state.district}
                  onChange={(event) => {this.setState({ district: event.target.value });}}
                >
                  {districtOptions}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formStarField">
              <Col sm={1} />
              <Form.Label column sm={3}>
                Bintang
              </Form.Label>
              <Col sm={6}>
              <Form.Control 
                as="select"
                defaultValue={this.state.star}
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