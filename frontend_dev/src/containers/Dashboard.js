import React, { Component } from "react";
import SearchForm from "./SearchForm";
import PaginatedSearchResult from "../components/PaginatedSearchResult";
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
      super(props);

      this.state = {
        query: "",
        data: [
          {
            name: "Hotel 1",
            address: "Jalan 1",
            star: "5",
            owner: "Bapak 1"
          },
          {
            name: "Hotel 2",
            address: "Jalan 2",
            star: "5",
            owner: "Bapak 2"
          },
          {
            name: "Hotel 3",
            address: "Jalan 3",
            star: "5",
            owner: "Bapak 3"
          }
        ],
        currPage: 0,
        numPages: 10
      };
  }

  handleSearch = (query) => {
    this.setState({ query: query, currPage: 0 });
    alert("search " + query);

    // TODO: request query at page 0
    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then(res => {
    //     const persons = res.data;
    //     this.setState({ persons });
    //   })
  }

  handlePageChange = (index) => {
    this.setState({ query: query, currPage: index });
    alert("req page " + index);
    
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
        <SearchForm onSubmit={this.handleSearch}/>
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