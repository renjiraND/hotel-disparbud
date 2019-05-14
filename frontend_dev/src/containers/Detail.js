import React, { Component } from "react";
import { Media, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { config } from "../config";
import { Redirect } from "react-router"
import querystring from "query-string";
import NavBarWithRouter from "../components/NavBarWithRouter";

export default class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "Nama Hotel",
            address: "Alamat Hotel",
            star: "5",
            owner: "Bapak",
            cert_end: "10/10/20"
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
                    this.setState(response.data)
                }
            });
  }
  render() {

    const isUserLoggedIn = (localStorage.getItem("token") !== null);

    return (
    <React.Fragment>
        {isUserLoggedIn ? (
      <React.Fragment>
          <NavBarWithRouter />
            <br />
          <br />
            <Container>
                <Row>
                    <Col xs={1}>
                    <Button variant="light" onClick= { () => { window.history.back() }}>
                        <i className="material-icons my-auto">
                            arrow_back
                        </i>
                    </Button>
                    </Col>
                    <Col xs={10} className="my-auto">{this.state.name}</Col>
                </Row>
                <hr/>
                <Media>
                    <Media.Body className="ml-3">
                        <DetailData ket={"Alamat"} icon={"map"} data={this.state.address}/>
                        <DetailData ket={"Bintang"} icon={"stars"} data={this.state.star}/>
                        <DetailData ket={"Owner"} icon={"account_circle"} data={this.state.owner}/>
                        <DetailData ket={"Masa Berlaku"} icon={"calendar_today"} data={this.state.cert_end.substr(0, 10)}/>
                    </Media.Body>
                </Media>
            </Container>
        
        <Container>
            <Button 
                className="float-right"
                onClick= { () => { window.location.href = "/edit?id=" + querystring.parse(this.props.location.search).id }}
            > 
                <span>Ubah</span> <i className="material-icons">edit</i>
            </Button>
        </Container>
        </React.Fragment>
        ) : (
          <Redirect to="/login"/>
        )}
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

