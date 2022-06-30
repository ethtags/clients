import React from "react";
import Button from 'react-bootstrap/Button'; 
import FormControl from 'react-bootstrap/FormControl'; 
import InputGroup from 'react-bootstrap/InputGroup';
import Toast from 'react-bootstrap/Toast';


class SuggestBar extends React.Component {

  constructor(props) {
    super(props);

    // bind functions
    this.submit = this.submit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  
  submit() {
    this.props.onSubmit(
      document.getElementById('suggestInput').value
    );
  }

  onKeyPress(event) {
    // submit nametag on keyboard Enter
    if (event.charCode === 13) {
      this.submit();
    }
  }

  render() {

    if (this.props.address === null || this.props.address === "") return null
    else {
    return (
      <>
      <Toast 
        show={this.props.error !== null}
        onClose={() => this.props.onToastClose()}
        bg="danger"
      >
        <Toast.Header>{this.props.error}</Toast.Header>
      </Toast>
      <InputGroup size="lg">
        <FormControl
          id="suggestInput"
          placeholder="Suggest a nametag"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onKeyPress={this.onKeyPress}
          disabled={this.props.loading}
        />
        <Button
          variant="dark"
          onClick={this.submit}
          disabled={this.props.loading}
        >
          Enter
        </Button>
      </InputGroup>
      </>
    )}
  }
}


export default SuggestBar;
