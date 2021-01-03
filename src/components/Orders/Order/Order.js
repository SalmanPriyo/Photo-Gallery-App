import React from 'react';


const Order = props => {
    console.log(props);
    const bookingSummery = props.order.facilities.map(item => {
        return (
            <span style={{
                border: "2px solid #3a6073",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "10px"
            }}
                key={item.type}><strong>{item.amount} x </strong><span style={{ textTransform: "capitalize" }}><strong>{item.type}</strong></span></span>
        )
    })
    return (
        <div style={{
            border: "2px solid #3a6073",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
            marginTop: "10px"
        }}>
            <strong>Order Number : {props.order.id}</strong><br />
            <strong>Booking Date : {props.order.customerInfo.bookingDate}</strong><br />
            <strong>Room Plan Chosen : {props.order.customerInfo.roomCategory}</strong>
            <hr />
            <strong>Facilities To Enjoy :</strong><br /><br />
            <div className="row" style={{ padding: "25px" }}>
                {bookingSummery}
            </div>
            <hr />
            <strong>Total : {props.order.price} BDT</strong>
        </div>
    );
}

export default Order;