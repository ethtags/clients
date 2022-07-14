import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 
import FormControl from 'react-bootstrap/FormControl'; 
import InputGroup from 'react-bootstrap/InputGroup';


function SearchBar(props) {

  let navigate = useNavigate();

  const handleSearch = () => {
    // get input
    var value = document.getElementById('searchInput').value;

    // remove leading/trailing whitespace from address
    value = value.trim();

    // return if empty
    if (value === undefined || value === null || value === "") return;

    // navigate to new address
    navigate(`/address/${value}`);
  }

  const onKeyPress = (event) => {
    // search nametag on keyboard Enter
    if (event.charCode === 13) {
      handleSearch();
    }
  }

  return (
    <InputGroup size={window.innerWidth < 576 ? "sm" : "lg"}>
      <FormControl 
        id="searchInput"
        placeholder={
            window.innerWidth < 416 ? "Address or ENS..." : 
            "Search for an address or ENS..."
        }
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
