import React, { Component } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import PaginatedSearchResult from "../components/PaginatedSearchResult";
import { config } from "../config";
import { Redirect } from "react-router"

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      district: "",
      star: "",
      data: [],
      currPage: 0,
      numPages: 1
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      const reqConfig = {
        headers: {
          Authorization: 'Token ' + localStorage.getItem("token")
        }
      };
      axios.get(this.getSearchUrl(this.state.currPage + 1), reqConfig)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              query: "",
              data: response.data.hotels,
              currPage: 0,
              numPages: response.data.max_pages
            })
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            window.location.href = "/login";
          } else {
            alert("load data hotel error bos!");
          }
        });
    }
  }

  getSearchUrl(page, name, district, star) {
    let url = `${config.apiBaseUrl}/search/?`;
    let firstParam = true;

    if (!!page) {
      if (!firstParam) {
        url += '&';
      }
      firstParam = false;
      url += `page=${page}`;
    }

    if (!!name) {
      if (!firstParam) {
        url += '&';
      }
      firstParam = false;
      url += `name=${name}`;
    }

    if (!!district) {
      if (!firstParam) {
        url += '&';
      }
      firstParam = false;
      url += `district=${district}`;
    }

    if (!!star) {
      if (!firstParam) {
        url += '&';
      }
      firstParam = false;
      url += `star=${star}`;
    }

    return url;
  }

  handleSearch = (query, district, star) => {
    if (district === 'Semua') {
      district = '';
    }
    if (star === 'Semua') {
      star = '';
    }

    const reqConfig = { 
      headers: {
        Authorization: 'Token ' + localStorage.getItem("token")
      } 
    };
    axios.get(this.getSearchUrl(this.state.currPage + 1, query, district, star), reqConfig)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            query: query,
            district: district,
            star: star,
            data: response.data.hotels,
            currPage: 0,
            numPages: response.data.max_pages
          })
        }
      })
      .catch(error => {
				if (error.response.status === 401) {
					window.location.href = "/login";
				} else {
					alert("search error bos!");
				}
			});
  }

  handlePageChange = (index) => {
    this.setState({ currPage: index }, () => {
      const page = this.state.currPage + 1;
      const query = this.state.query;
      const district = this.state.district;
      const star = this.state.star;
      const reqConfig = { 
        headers: {
          Authorization: 'Token ' + localStorage.getItem("token")
        } 
      };
      axios.get(this.getSearchUrl(page, query, district, star), reqConfig)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              query: query,
              district: district,
              star: star,
              data: response.data.hotels,
              currPage: index,
              numPages: response.data.max_pages
            })
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            window.location.href = "/login";
          } else {
            alert("load data hotel error bos!");
          }
        });
    });
  }

  render() {
    const isUserLoggedIn = (localStorage.getItem("token") !== null);
    return (
      <React.Fragment>
        {isUserLoggedIn ? (
          <React.Fragment>
            <SearchForm onSubmit={this.handleSearch} />
            <br />
            <PaginatedSearchResult
              data={this.state.data}
              currPage={this.state.currPage}
              numPages={this.state.numPages}
              onPageChange={this.handlePageChange}
            />
          </React.Fragment>
        ) : (
          <Redirect to="/login"/>
        )}
      </React.Fragment>
    );
  }
}