import React from 'react';
import Facilities from '../RoomFacilitites/Facilities';
import './HotelRoom.css';
import { CardColumns } from 'reactstrap';

const HotelRoom = props => {
    let facilitiesArr = props.facilities.map(item => {
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(_ => {
            return <Facilities type={item.type} key={Math.random()} />
        })
    })
        .reduce((arr, element) => {
            return arr.concat(element)
        }, []);

    console.log(facilitiesArr);
    // if (facilitiesArr.length === 0) {
    //     facilitiesArr = <p>Add facilities to enjoy your stay!</p>
    // }
    return (
        <div className="container row-lg row-md row-sm my-5">
            <CardColumns>
                {facilitiesArr}
            </CardColumns>
        </div>
    );
}

export default HotelRoom;