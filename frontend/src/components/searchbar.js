import React from "react";
import Button from 'react-bootstrap/Button'; 
import FormControl from 'react-bootstrap/FormControl'; 
import InputGroup from 'react-bootstrap/InputGroup';


function SearchBar(props) {

  const handleSearch = () => {
    // get input
    var value = document.getElementById('searchInput').value;

    // return if empty
    if (value === undefined || value === null || value === "") return;

    // call function
    props.onSubmit(value);
  }

  const onKeyPress = (event) => {
    // search nametag on keyboard Enter
    if (event.charCode === 13) {
      handleSearch();
    }
  }

  return (
    <InputGroup size="lg">
      <FormControl 
        id="searchInput"
        placeholder="Search for an address or ENS name..."
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        onKeyPress={onKeyPress}
      />
      <Button
        variant="dark"
        onClick={handleSearch}
      >
        Search
      </Button>
    </InputGroup>
  )
}


export default SearchBar;
