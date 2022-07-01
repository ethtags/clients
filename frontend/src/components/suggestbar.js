import React from "react";
import Button from 'react-bootstrap/Button'; 
import FormControl from 'react-bootstrap/FormControl'; 
import InputGroup from 'react-bootstrap/InputGroup';
import Toast from 'react-bootstrap/Toast';


function SuggestBar(props) {

  const submit = () => {
    props.onSubmit(
      document.getElementById('suggestInput').value
    );
  }

  const onKeyPress = (event) => {
    // submit nametag on keyboard Enter
    if (event.charCode === 13) {
      submit();
    }
  }

  const render = () => {
    if (props.address === null ||
        props.address === undefined ||
        props.address === "")
        return null
    else {
      return (
        <>
          <Toast 
            show={props.error !== null}
            onClose={() => props.onToastClose()}
            bg="danger"
          >
            <Toast.Header>{props.error}</Toast.Header>
          </Toast>
          <InputGroup size="lg">
            <FormControl
              id="suggestInput"
              placeholder="Suggest a nametag"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onKeyPress={onKeyPress}
              disabled={props.loading}
            />
            <Button
              variant="dark"
              onClick={submit}
              disabled={props.loading}
            >
              Enter
            </Button>
          </InputGroup>
        </>
      )
    }
  }

  return render();
}


export default SuggestBar;
