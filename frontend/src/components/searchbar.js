import React from "react";
import Button from 'react-bootstrap/Button'; 
import FormControl from 'react-bootstrap/FormControl'; 
import InputGroup from 'react-bootstrap/InputGroup';


function SearchBar(props) {

  const handleSearch = () => {
    props.onSubmit(
      document.getElementById('searchInput').value
    );
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
        placeholder="Search for an address"
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
