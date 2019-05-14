import React, { Component } from "react";
import { Button, Form, Card } from "react-bootstrap";
import "./Login.css";
import { config } from "../config";
import axios from 'axios'

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
	}

	componentDidMount() {
		localStorage.removeItem('token');
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
		axios.post(config.apiBaseUrl + '/login/', this.state)
			.then(response => {
				if (response.status === 200) {
					localStorage.setItem('token', response.data.token);
					window.location.href = "/";
				}
			})
			.catch(error => {
				if (error.response.status === 401) {
					alert("Email dan/atau password salah")
				} else {
					alert("login error bos!");
				}
			});
	}

	render() {
		return (
			<div className="vh-100">
				<Card className="w-50 mx-auto my-auto LoginCard">
					<Card.Body>
						<Form onSubmit={this.handleSubmit}>
							<div className="row">
								<h2 className="col my-auto">Login</h2>
								<img src="./images/logo-disbudpar.png" alt="" className="w-25 h-25"></img>
							</div>
							<hr />
							<div>
								<Form.Group controlId="formBasicEmail" className="row mx-auto">
									<Form.Label className="col-4 my-auto">Email address</Form.Label>
									<Form.Control id="email" type="email" placeholder="Enter email" className="col-8" onChange={this.handleChange} />
								</Form.Group>

								<Form.Group controlId="formBasicPassword" className="row mx-auto">
									<Form.Label className="col-4 my-auto">Password</Form.Label>
									<Form.Control id="password" type="password" placeholder="Password" className="col-8" onChange={this.handleChange}/>
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
			</div>
		);
	}
}