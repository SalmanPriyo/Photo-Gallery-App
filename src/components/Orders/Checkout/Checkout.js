import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spiner';
import { resetFacilities } from '../../../redux/ActionCreator';


const mapStateToProps = state => {
    return {
        facilities: state.facilities,
        totalPrice: state.totalPrice,
        affordable: state.affordable,
        userId: state.userId,
        token: state.token
    }
}


const mapDispatchToProps = dispatch => {
    return {
        resetFacilities: () => dispatch(resetFacilities())
    }
}

class Checkout extends Component {
    state = {
        values: {
            bookingDate: "",
            roomCategory: "Single Room With Double Bed",
            phone: "",
            paymentType: "Cash on delivary"
        },
        isSpinnerLoading: false,
        isModal: false,
        modalText: ""
    }
    goBack = () => {
        this.props.history.goBack("/");
    }

    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = () => {
        this.setState({
            isSpinnerLoading: true
        })
        const order = {
            facilities: this.props.facilities,
            customerInfo: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId,
        }
        // console.log(this.state.values);
        axios.post("https://hotel-booking-app-cab34.firebaseio.com/orders.json?auth=" + this.props.token, order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isSpinnerLoading: false,
                        isModal: true,
                        modalText: "Order has been successfully placed!"
                    })
                    this.props.resetFacilities();
                } else {
                    this.setState({
                        isSpinnerLoading: false,
                        isModal: true,
                        modalText: "Opps! Something went wrong. Please try again."
                    })
                }
            })
            .catch(error => {
                this.setState({
                    isSpinnerLoading: false,
                    isModal: true,
                    modalText: "Opps! Something went wrong. Please try again."
                })
            })
        console.log(order);
    }
    render() {
        let form = (
            <div>
                <h4 style={{
                    border: "2px solid #3a6073",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    marginTop: "10px",
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "bold"
                }}>Total : {this.props.totalPrice} BDT</h4>
                <form style={{
                    border: "2px solid #3a6073",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px"
                }}>
                    <h5 style={{ fontWeight: "bold" }}>Booking Date: </h5>
                    <input name="bookingDate" value={this.state.values.bookingDate} className="form-control" placeholder="Type your booking date here" onChange={(e) => this.inputChangeHandler(e)} />
                    <br />
                    <h5 style={{ fontWeight: "bold" }}>Choose Your Room Plan: </h5>
                    <select name="roomCategory" value={this.state.values.roomCategory} className="form-control" onChange={(e) => this.inputChangeHandler(e)}>
                        <option value="Single Room With Double Bed">Single Room With Double Bed</option>
                        <option value="Single Room With Single Bed">Single Room With Single Bed</option>
                        <option value="Suit">Suit</option>
                        <option value="Double Room with Doubel Bed">Double Room with Doubel Bed</option>
                    </select>
                    <br />
                    <h5 style={{ fontWeight: "bold" }}>Mobile Number: </h5>
                    <input name="phone" value={this.state.values.phone} className="form-control" placeholder="Type mobile number" onChange={(e) => this.inputChangeHandler(e)} />
                    <br />
                    <h5 style={{ fontWeight: "bold" }}>Payment Type: </h5>
                    <select name="paymentType" value={this.state.values.paymentType} className="form-control" onChange={(e) => this.inputChangeHandler(e)}>
                        <option value="Cash on delivary">Credit Card</option>
                        <option value="Bkash">Mobile Banking</option>
                        <option value="Nagad">Cash in Counter</option>
                        <option value="Rocket">Bank</option>
                    </select><br />
                    <div style={{ textAlign: "right" }}>
                        <button type="button" style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", color: "white", fontSize: "20px", padding: "10px" }} className="btn mr-auto" onClick={this.submitHandler} disabled={!this.props.affordable} >Place Your Order</button>
                        <button type="button" className="btn ml-1" style={{ backgroundColor: "grey", color: "white", fontSize: "20px", padding: "10px" }} onClick={this.goBack} >Cancel</button>
                    </div>

                </form>
            </div>)
        return (
            <div className="container">
                {this.state.isSpinnerLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModal} onClick={this.goBack} style={{ fontWeight: "bold" }}>
                    <ModalBody style={{ background: "linear-gradient(to right, #16222a, #3a6073)", color: "white", fontSize: "20px", textAlign: "center" }}><p>{this.state.modalText}</p></ModalBody>
                </Modal>
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);