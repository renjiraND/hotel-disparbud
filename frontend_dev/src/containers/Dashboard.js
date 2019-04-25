import React, { Component } from "react";
import SearchForm from "./SearchForm";
import PaginatedSearchResult from "../components/PaginatedSearchResult";
import axios from "axios";
import { config } from "../config";

export default class Dashboard extends Component {
  constructor(props) {
      super(props);

      this.state = {
        query: "",
        data: [],
        currPage: 0,
        numPages: 1
      };

      axios.get(this.getSearchUrl())
         .then(response => {
            if (response.status !== 200) {
              alert("error bos!");
            } else {
              this.setState({
                query: "",
                data: response.data.hotels,
                currPage: 0,
                numPages: response.data.max_pages
              })
            }
         })
  }

  getSearchUrl(name, district, star) {
    let url = `${config.apiBaseUrl}/search/?`;
    let firstParam = true;

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
    console.log(url);
    return url;
  }

  handleSearch = (query, district, star) => {
    if (district === 'Semua') {
      district = '';
    }
    if (star === 'Semua') {
      star = '';
    }
    axios.get(this.getSearchUrl(query, district, star))
         .then(response => {
            if (response.status !== 200) {
              alert("search error bos!");
            } else {
              this.setState({
                query: query,
                data: response.data.hotels,
                currPage: 0,
                numPages: response.data.max_pages
              })
            }
         })
  }

  handlePageChange = (index) => {
    this.setState({ currPage: index });
    // alert("req page " + index);

    // TODO: req query at page index
    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then(res => {
    //     const persons = res.data;
    //     this.setState({ persons });
    //   })
  }

  render() {
    return (
      <React.Fragment>
        {<SearchForm onSubmit={this.handleSearch}/>}
        <br />
        <PaginatedSearchResult
          data={this.state.data}
          currPage={this.state.currPage}
          numPages={this.state.numPages}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}