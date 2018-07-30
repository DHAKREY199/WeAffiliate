import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  
    this.state = {
      showModal: true
    };
  
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  
  
  open() {
    this.setState({showModal: true});
  }
  
  close() {
    this.setState({showModal: false});
  }
  
  render() {
    return(
      
          <Modal className="modal-container" 
            show={this.state.showModal} 
            onHide={this.close}
            animation={true} 
            bsSize="small">
  
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
  
            <Modal.Body>
              One of fine body.........
            </Modal.Body>
  
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
              <Button bsStyle="primary">Save changes</Button>
            </Modal.Footer>         
          </Modal> 
       
    );
   }
  }
  
  
export default App