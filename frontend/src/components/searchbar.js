import React from "react";
import Button from 'react-bootstrap/Button'; 
import FormControl from 'react-bootstrap/FormControl'; 
import InputGroup from 'react-bootstrap/InputGroup';


class SearchBar extends React.Component {
  render() {
    return (
      <InputGroup size="lg">
        <FormControl placeholder="Search for an address" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
        <Button variant="dark">Search</Button>
      </InputGroup>
    )
  }
}


export default SearchBar;
