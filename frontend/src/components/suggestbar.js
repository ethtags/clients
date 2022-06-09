import React from "react";
import Button from 'react-bootstrap/Button'; 
import FormControl from 'react-bootstrap/FormControl'; 
import InputGroup from 'react-bootstrap/InputGroup';


class SuggestBar extends React.Component {
  render() {
    return (
      <InputGroup size="lg">
        <FormControl placeholder="Suggest a nametag" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
        <Button variant="dark">Enter</Button>
      </InputGroup>
    )
  }
}


export default SuggestBar;
