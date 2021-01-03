import React from 'react';
import seaViewBalcony from '../../../assets/images/sea2.jpg';
import swimingPool from '../../../assets/images/swim2.jpg';
import candleLightDinner from '../../../assets/images/candle2.jpg';
import exoticSeaFoods from '../../../assets/images/food2.jpg';
import barbequePartyAtShore from '../../../assets/images/party2.jpg';
import './Facilities.css';

const Facilities = props => {
    let facilities = null;

    switch (props.type) {
        case 'seaViewBalcony':
            facilities = <div><img className="img-fluid" src={seaViewBalcony} alt="Meat" /></div>
            break;
        case 'swimingPool':
            facilities = <div><img className="img-fluid" src={swimingPool} alt="Cheese" /></div>
            break;
        case 'candleLightDinner':
            facilities = <div><img className="img-fluid" src={candleLightDinner} alt="Salad" /></div>
            break;
        case 'exoticSeaFoods':
            facilities = <div><img className="img-fluid" src={exoticSeaFoods} alt="Salad" /></div>
            break;
        case 'barbequePartyAtShore':
            facilities = <div><img className="img-fluid" src={barbequePartyAtShore} alt="Salad" /></div>
            break;
        default:
            facilities = null;
    }
    return (
        <div className="Facilities">
            {facilities}
        </div>
    );
}

export default Facilities;