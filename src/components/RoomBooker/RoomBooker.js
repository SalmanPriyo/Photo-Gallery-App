import React, { Component } from 'react';
import HotelRoom from './HotelRoom/HotelRoom';
import Controls from './Controls/Controls';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Summery from './Summery/Summery';
import { addFacility, removeFacility, updateAffordable } from '../../redux/ActionCreator';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        facilities: state.facilities,
        totalPrice: state.totalPrice,
        affordable: state.affordable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFacility: (ingType) => dispatch(addFacility(ingType)),
        removeFacility: (ingType) => dispatch(removeFacility(ingType)),
        updateAffordable: () => dispatch(updateAffordable())
    }
}

class RoomBooker extends Component {
    state = {
        modalOpen: false
    }


    addFacilityHandle = type => {
        this.props.addFacility(type);
        this.props.updateAffordable();
    }

    removeFacilityHandle = type => {
        this.props.removeFacility(type);
        this.props.updateAffordable();
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckout = () => {
        this.props.history.push("/checkout")
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <HotelRoom facilities={this.props.facilities} />
                    <Controls
                        facilityAdded={this.addFacilityHandle}
                        facilityRemoved={this.removeFacilityHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        affordable={this.props.affordable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "25px", marginTop: "10px", borderBottom: "2px solid #3a6073", paddingBottom: "15px" }}>Booking Summery</p>
                    <ModalBody>
                        <h5 style={{ fontSize: "22px", fontWeight: "bold" }}>Facilities You've Added: </h5>
                        <Summery facilities={this.props.facilities} />
                        <h5 style={{ fontSize: "25px", fontWeight: "bold", textAlign: "right" }}>Total : {this.props.totalPrice.toFixed(0)} BDT</h5>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn" style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", color: "white" }} onClick={this.handleCheckout}>Continue to checkout</button>
                        <button className="btn btn-grey" style={{ background: "grey", color: "white" }} onClick={this.toggleModal}>Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomBooker);