import * as actionTypes from './ActionTypes';
import axios from 'axios';


export const addFacility = ingType => {
    return {
        type: actionTypes.ADD_FACILITIES,
        payload: ingType
    }
}


export const removeFacility = ingType => {
    return {
        type: actionTypes.REMOVE_FACILITIES,
        payload: ingType
    }
}


export const updateAffordable = () => {
    return {
        type: actionTypes.UPDATE_AFFORDABLE
    }
}

export const resetFacilities = () => {
    return {
        type: actionTypes.RESET_FACILITIES
    }
}

export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED
    }
}

export const fetchOrders = (token, userId) => dispatch => {
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://hotel-booking-app-cab34.firebaseio.com/orders.json?auth=' + token + queryParams)
        .then(response => {
            dispatch(loadOrders(response.data))
        })
        .catch(error => {
            dispatch(orderLoadFailed());
        })
}