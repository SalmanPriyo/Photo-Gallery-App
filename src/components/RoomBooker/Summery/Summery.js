import React from 'react';

const Summery = props => {
    const summeryBooking = props.facilities.map(item => {
        return (
            <li key={item.type}>
                <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>{item.type} : {item.amount}</span>
            </li>
        )
    })
    return (
        <div>
            <ul>
                {summeryBooking}
            </ul>
        </div>
    );
}

export default Summery;