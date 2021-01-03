import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap';

const controls = [
    { label: "Sea View Balcony", type: "seaViewBalcony" },
    { label: "Swiming Pool", type: "swimingPool" },
    { label: "Sea-foods", type: "exoticSeaFoods" },
    { label: "Candle-light Dinner", type: "candleLightDinner" },
    { label: "Party at Shore", type: "barbequePartyAtShore" }
]


const BuildControl = props => {
    return (
        <div className="d-flex">
            <div className="mr-auto ml-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <button className="btn btn-sm m-1" style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", color: "wheat" }} onClick={props.added}>Add</button>
            <button className="btn btn-sm m-1" style={{ background: "wheat", color: "#3a6073" }} onClick={props.removed}>Remove</button>
        </div>
    );
}




const Controls = props => {
    return (
        <div className="container row-lg row-md row-sm ml-2 text-center">
            <Card style={{ marginTop: "30px", marginBottom: "30px" }}>
                <CardHeader style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", color: "wheat", fontWeight: "bold", fontSize: "20px" }}>Facilities you want to enjoy</CardHeader>
                <CardBody style={{ padding: "2px" }}>
                    {
                        controls.map(item => {
                            return <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                added={() => props.facilityAdded(item.type)}
                                removed={() => props.facilityRemoved(item.type)} />
                        })
                    }
                </CardBody>
                <CardFooter><h5><strong>Price: {props.price} BDT</strong></h5></CardFooter>
                <button className="btn" disabled={!props.affordable} onClick={props.toggleModal} style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", color: "wheat", fontWeight: "bold" }}>Book Now</button>
            </Card>
        </div>
    );
}

export default Controls;