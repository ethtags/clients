import React from "react";
import Button from 'react-bootstrap/Button'; 
import FormControl from 'react-bootstrap/FormControl'; 
import InputGroup from 'react-bootstrap/InputGroup';
import Toast from 'react-bootstrap/Toast';


class SuggestBar extends React.Component {

  constructor(props) {
    super(props);
    // TODO can this be moved out to be a global constant
    this.baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";

    this.state = {
      error: null,
      loading: false,
    };

    // bind functions
    this.submitNametag = this.submitNametag.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  
  submitNametag() {
    // get value from input
    const value = document.getElementById('suggestInput').value;

    // prepare request
    var url = this.baseUrl + this.props.address + "/tags/";
    const data = {"nametag": value};
    
    // set state to loading
    this.setState({loading: true});

    // submit request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(
        (result) => {
          // handle non-2xx responses from server
          if (result.ok === false) {
            return result.json();
          }

          // success state
          this.setState({
            loading: false,
          });
        })
      // handle non-2xx responses from server
      .then(
        (result) => { 
          console.error(result);
          this.setState({
            loading: false,
            error: JSON.stringify(result)
          });
        })
      // show and log errors
      .catch(
        (error) => {
          console.error(error);
          this.setState({
            loading: false,
            error: error.message
          });
        }
      );
  }

  onKeyPress(event) {
    // submit nametag on keyboard Enter
    if (event.charCode === 13) {
      this.submitNametag();
    }
  }

  render() {

    return (
      <>
      <Toast 
        show={this.state.error !== null}
        onClose={() => this.setState({error: null})}
        bg="danger"
      >
        <Toast.Header>{this.state.error}</Toast.Header>
      </Toast>
      <InputGroup size="lg">
        <FormControl
          id="suggestInput"
          placeholder="Suggest a nametag"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onKeyPress={this.onKeyPress}
          disabled={this.state.loading}
        />
        <Button
          variant="dark"
          onClick={this.submitNametag}
          disabled={this.state.loading}
        >
          Enter
        </Button>
      </InputGroup>
      </>
    )
  }
}


export default SuggestBar;
