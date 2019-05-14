import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Modal, Container } from "react-bootstrap";
import { config } from "../config";
import { Redirect } from "react-router";
import querystring from "query-string";
import NavBarWithRouter from "../components/NavBarWithRouter";

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      district: "",
      address: "",
      star: "1",
      owner: "",
      cert_start: "",
      cert_end: "",
      postSuccess: false
    };

    let id = querystring.parse(this.props.location.search).id;

    let request = {
      url : config.apiBaseUrl + "/hotels/" + id,
      headers: {
        'Authorization': 'Token ' + localStorage.getItem("token"),
      },
    }

    axios( request )
      .then(response => {
        if (response.status === 401) {
          window.location.href = "/login"
        } else if (response.status !== 200) {
          alert("error bos!");
        } else {
          this.setState({
            name: response.data.name,
            district: response.data.district,
            address: response.data.address,
            star: response.data.star,
            owner: response.data.owner,
            cert_start: response.data.cert_start.slice(0,10),
            cert_end: response.data.cert_end.slice(0,10),
          });
        }
      });

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
      cert_start: this.state.cert_start + "T00:00:00Z",
      cert_end: this.state.cert_end + "T00:00:00Z"
    };

    const reqConfig = { 
      headers: {
        Authorization: 'Token ' + localStorage.getItem("token")
      } 
    };
    axios.put(`${config.apiBaseUrl}/hotels/`+ querystring.parse(this.props.location.search).id+`/` , payload, reqConfig)
      .then(response => {
        if (response.status === 200) {
          this.setState({ postSuccess: true })
        }
      })
      .catch(error => {
				if (error.response.status === 401) {
          window.location.href = "/login";
				} else {
					alert("edit hotel error bang!");
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

              <h1>Edit Data Hotel</h1>
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
                      value={this.state.name}
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
                      value={this.state.district}
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
                      value={this.state.address}
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
                      value={this.state.star}
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
                      value={this.state.owner}
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
                      onChange={(event) => {this.setState({ cert_start: event.target.value });}}
                      value={this.state.cert_start}
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
                      onChange={(event) => {this.setState({ cert_end: event.target.value });}}
                      value={this.state.cert_end}
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

              <Modal show={this.state.postSuccess} onHide={this.handleSuccessModalHide}>
                <Modal.Header closeButton>
                  <Modal.Title>Input Data Berhasil!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Data hotel baru berhasil ditambahkan.</Modal.Body>
              </Modal>
            </Container>
          </React.Fragment>
        ) : (
          <Redirect to="/login"/>
        )}
      </React.Fragment>
    );
  }
}