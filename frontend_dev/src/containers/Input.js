import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Modal, Container } from "react-bootstrap";
import { config } from "../config";
import { Redirect } from "react-router"
import NavBarWithRouter from "../components/NavBarWithRouter";

export default class SearchForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: "",
        district: "",
        address: "",
        star: "1",
        owner: "",
        certStart: "",
        certEnd: "",
        postSuccess: false
      };

      this.stars = [
        "1", "2", "3", "4", "5"
      ];
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      name: this.state.name,
      district: this.state.district,
      address: this.state.address,
      star: this.state.star,
      owner: this.state.owner,
      cert_start: this.state.certStart + "T00:00:00Z",
      cert_end: this.state.certEnd + "T00:00:00Z"
    };

    const reqConfig = { 
      headers: {
        Authorization: 'Token ' + localStorage.getItem("token")
      } 
    };
    axios.post(`${config.apiBaseUrl}/hotels/`, payload, reqConfig)
      .then(response => {
        if (response.status === 201) {
          this.setState({ postSuccess: true })
        }
      })
      .catch(error => {
				if (error.response.status === 401) {
          window.location.href = "/login";
				} else {
					alert("nambah hotel error bang!");
				}
			});
  }

  handleSuccessModalHide = () => {
    window.location.reload();
  };

  render() {
    const starOptions = this.stars.map((star, index)  => 
      <option key={index}>{star}</option>
    );

    const isUserLoggedIn = (localStorage.getItem("token") !== null);

    return (
      <React.Fragment>
        {isUserLoggedIn ? (
          <React.Fragment>
            <NavBarWithRouter />
            <br />

            <Container>
              <h1>Input Data Hotel</h1>
              <hr />
              <Form
                onSubmit={this.handleSubmit}
              >
                <Form.Group as={Row} controlId="formNameField">
                  <Form.Label column sm={3}>
                    Nama Hotel
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control 
                      required
                      type="text" placeholder="Nama Hotel"
                      onChange={(event) => {this.setState({ name: event.target.value });}}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDistrictField">
                  <Form.Label column sm={3}>
                    Kabupaten/Kota
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control 
                      required
                      type="text" placeholder="Nama Kabupaten/Kota" 
                      onChange={(event) => {this.setState({ district: event.target.value });}}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAddressField">
                  <Form.Label column sm={3}>
                    Alamat
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control 
                      required
                      type="text" placeholder="Alamat" 
                      onChange={(event) => {this.setState({ address: event.target.value });}}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formStarField">
                  <Form.Label column sm={3}>
                    Bintang
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control 
                      as="select"
                      defaultValue={this.state.star}
                      onChange={(event) => {this.setState({ star: event.target.value });}}
                    >
                      {starOptions}
                    </Form.Control>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formOwnerField">
                  <Form.Label column sm={3}>
                    Owner
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control 
                      required
                      type="text" placeholder="Nama Owner" 
                      onChange={(event) => {this.setState({ owner: event.target.value });}}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCertStartField">
                  <Form.Label column sm={3}>
                    Tanggal Awal Berlaku Sertifikat
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control 
                      required
                      type="date"
                      onChange={(event) => {this.setState({ certStart: event.target.value });}}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCertEndField">
                  <Form.Label column sm={3}>
                    Tanggal Akhir Berlaku Sertifikat
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control 
                      required
                      type="date"
                      onChange={(event) => {this.setState({ certEnd: event.target.value });}}
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
            </Container>

            <Modal show={this.state.postSuccess} onHide={this.handleSuccessModalHide}>
              <Modal.Header closeButton>
                <Modal.Title>Input Data Berhasil!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Data hotel baru berhasil ditambahkan.</Modal.Body>
            </Modal>
          </React.Fragment>
        ) : (
          <Redirect to="/login"/>
        )}
      </React.Fragment>
    );
  }
}