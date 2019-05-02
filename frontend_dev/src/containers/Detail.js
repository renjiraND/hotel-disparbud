import React, { Component } from "react";
import { Media, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { config } from "../config";
import querystring from "query-string";

export default class Dashboard extends Component {
  constructor(props) {
      super(props);

      this.state = {
        name: "Arya Duta",
        address: "Jl. Sumatera No. 51",
        star: "5",
        owner: "Bapak",
        cert_end: "10/10/20"
      };

      let id = querystring.parse(this.props.location.search).id;

      axios.get( config.apiBaseUrl + "/hotels/" + id)
        .then(response => {
          if (response.status !== 200) {
            alert("error bos!");
          } else {
            this.setState(response.data)
          }
        });
  }
  render() {
    return (
      <React.Fragment>
          <br />
            <Container>
                <Row>
                    <Col xs={1}>
                    <Button variant="light">
                        <i className="material-icons my-auto">
                            arrow_back
                        </i>
                    </Button>
                    </Col>
                    <Col xs={10} className="my-auto">{this.state.name}</Col>
                </Row>
                <hr/>
            </Container>
        <Media>
            <Media.Body className="ml-3">
                <DetailData ket={"Alamat"} icon={"map"} data={this.state.address}/>
                <DetailData ket={"Bintang"} icon={"stars"} data={this.state.star}/>
                <DetailData ket={"Owner"} icon={"account_circle"} data={this.state.owner}/>
                <DetailData ket={"Masa Berlaku"} icon={"calendar_today"} data={this.state.cert_end.substr(0, 10)}/>
            </Media.Body>
            <img
                width={250}
                height={200}
                className="ml-3"
                src="holder.js/64x64"
                alt="Generic placeholder"
            />
        </Media>
      </React.Fragment>
    );
  }
}

export class DetailData extends Component {
    render(){
        return(
            <Row>
                <Col md={1}>
                    <i className="material-icons">
                        {this.props.icon}
                    </i>
                </Col>
                <Col md={{span:2,offset:0}}>
                    <p><strong>{this.props.ket}</strong></p>
                </Col>
                <Col md={{span:3,offset:0}}>
                    <p>{this.props.data}</p>
                </Col>
            </Row>
        )
    }
}

