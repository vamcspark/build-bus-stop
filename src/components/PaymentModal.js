import React, { useState, Component } from 'react';
import './Payment.css'
import { connect } from "react-redux";
import { donateToStop } from '../redux/actions'
import { StringConstants, validationConstants } from '../constants/constants';
import { httpService } from '../services/http-service';


const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        donateAmount: data => { dispatch(donateToStop(data)) },
    };
}

class PaymentModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stopName: this.props.data.name,
            name: "",
            amount: "",
            ccno: "",
            cvv: "",
            error: {
                hasError: false,
                message: ""
            }
        }
    }

    checkIfMissing = () => {
        let { stopName, amount, name, ccno, cvv } = this.state;
        if (stopName === undefined || amount === "" ||
            name === "", ccno === "" || cvv === "") {
                this.setState({
                    error : { 
                        hasError : true,
                        message: "Fields cannot be empty"
                    }
                })
                return true;
        }
        return false;
    }

    processPayment = () => {
        if(this.checkIfMissing() === true){
            return;
        }
        let { stopName, amount, name, ccno, cvv } = this.state;
        let d = new Date();
        let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
        let request = {
            stopName,
            amount,
            transaction: {
                name: name,
                amount: amount,
                timestamp: date
            }
        }
        httpService.donateToAStop(request).then((response) => {
            if (response === "success") {
                const stops = httpService.getAllStops();
                this.props.donateAmount({
                    [StringConstants.STOPS_DATA]: JSON.parse(stops)
                })
            }
        })
        this.props.close()
    }

    setName = (name) => {
        this.setState({
            name: name
        })
    }

    setAmountDetails = (amount) => {
        if (validationConstants.NUMERIC_VALIDATAION.test(amount)) {
            this.setState({
                amount: amount
            })
        }
    }

    setCcDetails = (ccno) => {
        if (validationConstants.NUMERIC_VALIDATAION.test(ccno)) {
            this.setState({
                ccno: ccno
            })
        }
    }

    setCvv = (cvv) => {
        if (validationConstants.NUMERIC_VALIDATAION.test(cvv)) {
            this.setState({
                cvv: cvv
            })
        }
    }

    render() {
        return (<div className="payment-modal">
            <form class="modal-content animate">
                <div><b>Click else where to cancel</b></div>
                <div class="imgcontainer">
                    <img src="./cards.jpg" alt="Avatar" class="avatar" />
                </div>
                <div class="container">
                    {this.state.error.hasError ? <div className="error-message">{this.state.error.message}</div> : null}
                    <label for="uname"><b>Donating to</b></label>
                    <input type="text" name="uname" value={this.props.data.name} readOnly />

                    <label for="uname"><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" value={this.state.name} onChange={e => this.setName(e.target.value)} required />

                    <label for="psw"><b>Amount</b></label>
                    <input type="text" placeholder="Enter Amount" onChange={e => this.setAmountDetails(e.target.value)} value={this.state.amount} required />

                    <label for="psw"><b>Credit Card Number</b></label>
                    <input type="text" value={this.state.ccno} onChange={e => this.setCcDetails(e.target.value)} placeholder="Credit Card Number" required />

                    <label for="psw"><b>CVV</b></label>
                    <input value={this.state.cvv} type="password" onChange={e => this.setCvv(e.target.value)} placeholder="CVV" name="psw" required />

                    <button onClick={this.processPayment} type="button">Process Payment</button>
                </div>
            </form>
        </div>
        )
    }
}


export const PaymentProcess = connect(mapStateToProps, mapDispatchToProps)(PaymentModal);