import React, { Component } from "react";
import SearchForm from "./SearchForm";
import PaginatedSearchResult from "../components/PaginatedSearchResult";

export default class Dashboard extends Component {
  constructor(props) {
      super(props);

      this.state = {
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
        currPage: 1,
        numPages: 10
      };
  }

  render() {
    return (
      <React.Fragment>
        <SearchForm />
        <br />
        <PaginatedSearchResult 
          data={this.state.data} 
          currPage={this.state.currPage}
          numPages={this.state.numPages} 
        />
      </React.Fragment>
    );
  }
}