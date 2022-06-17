import React from "react";
import Button from 'react-bootstrap/Button'; 
import FormControl from 'react-bootstrap/FormControl'; 
import InputGroup from 'react-bootstrap/InputGroup';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  handleSearch() {
    this.props.onSubmit(
      document.getElementById('searchInput').value
    );
  }

  onKeyPress(event) {
    // search nametag on keyboard Enter
    if (event.charCode === 13) {
      this.handleSearch();
    }
  }

  render() {
    return (
      <InputGroup size="lg">
        <FormControl 
          id="searchInput"
          placeholder="Search for an address"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onKeyPress={this.onKeyPress}
        />
        <Button
          variant="dark"
          onClick={this.handleSearch}
        >
          Search
        </Button>
      </InputGroup>
    )
  }
}


export default SearchBar;
