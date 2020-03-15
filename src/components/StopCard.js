import React, { Component } from 'react';
import './Stop.css';
import { connect } from "react-redux";
import Modal from 'simple-react-modal';
import {PaymentProcess} from './PaymentModal';

const mapStateToProps = state => {
  return state;
}

class StopCard extends Component {
 
 constructor(props){
   super(props);
   this.state = {
     showModal : false
   }
 }

 close = () => {
    this.setState({
      showModal: false
    })
 }

 
 show = () => {
  this.setState({
    showModal: true
  })
}

  render() {

    const innerStyle = { 
    'width': '400px',
    'position': 'relative',
    'margin': '10% auto',
    'padding': '1px 0px 1px',
    'background': 'teal'
    }

    return (
        <div className="card">
            <img src="./bus-stop.png" alt="Bus stop" style={{"width":"50%"}}/>
            <div className="card-data-container">
            <p>{this.props.data.name}</p>
            <p className="price">Target : ${this.props.data.funds.target}</p>
            <p className="price">Need : ${this.props.data.funds.required}</p>
            <p className="price">Current : ${this.props.data.funds.current}</p>
            <p>{this.props.data.location}</p>
            <p><button onClick={this.show}>Donate Now</button></p>
            <Modal containerStyle={innerStyle} show={this.state.showModal} onClose={this.close}>
              <PaymentProcess data={this.props.data} close={this.close}/>
            </Modal>
            </div>
        </div>
    );
  }
}

export const StopCardContainer = connect(mapStateToProps)(StopCard);
