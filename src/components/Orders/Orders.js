import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/ActionCreator';
import Order from '../Orders/Order/Order';
import Spiner from '../Spinner/Spiner';

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderError: state.orderError,
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

class Orders extends Component {
    componentDidMount = () => {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    componentDidUpdate = () => {
        console.log(this.props);
    }
    render() {
        let orders = null;
        if (this.props.orderError) {
            orders = <p style={{
                border: "2px solid #3a6073",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "10px",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center"
            }}>Sorry, failed to load bookings!</p>
        } else {
            if (this.props.orders.length === 0) {
                orders = <p style={{
                    border: "2px solid #3a6073",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center"
                }}>You have no bookings!</p>
            } else {
                orders = this.props.orders.map(order => {
                    return <Order order={order} key={order.id} />
                })
            }
        }
        return (
            <div>
                {this.props.orderLoading ? <Spiner /> : orders}
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);