import React from "react";
import { Table, Pagination } from "react-bootstrap";

export default function PaginatedSearchResult(props) {
  const rows = props.data.map((row, index) =>
    <tr key={index}>
      <td>{row.name}</td>
      <td>{row.address}</td>
      <td>{row.star}</td>
      <td>{row.owner}</td>
    </tr>
  );

  let pages = [];
  for (let i = 0; i < props.numPages; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === props.currPage}
        onClick={() => {
          props.onPageChange(i);
        }}
      >
        {i + 1}
      </Pagination.Item>,
    );
  }

  return (
    <React.Fragment>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Bintang</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
      <br />
      <Pagination className="d-flex justify-content-center">
        {pages}
      </Pagination>
    </React.Fragment>
  );
}