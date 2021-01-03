import * as actionTypes from './ActionTypes';

const INGREDIENT_PRICES = {
    seaViewBalcony: 1000,
    swimingPool: 500,
    exoticSeaFoods: 1500,
    candleLightDinner: 1200,
    barbequePartyAtShore: 500
}



const INITIAL_STATE = {
    facilities: [
        { type: 'seaViewBalcony', amount: 0 },
        { type: 'swimingPool', amount: 0 },
        { type: 'exoticSeaFoods', amount: 0 },
        { type: 'candleLightDinner', amount: 0 },
        { type: 'barbequePartyAtShore', amount: 0 }
    ],
    totalPrice: 2500,
    affordable: false,
    orders: [],
    orderLoading: true,
    orderError: false,
    userId: null,
    token: null,
    authLoading: false,
    authMsgFailed: null
}


export const reducer = (state = INITIAL_STATE, action) => {
    const facilities = [...state.facilities];
    switch (action.type) {
        case actionTypes.ADD_FACILITIES:
            for (let item of facilities) {
                if (item.type === action.payload) item.amount++;
            }
            return {
                ...state,
                facilities: facilities,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
            }
        case actionTypes.REMOVE_FACILITIES:
            for (let item of facilities) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                facilities: facilities,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
            }

        case actionTypes.UPDATE_AFFORDABLE:
            const sum = state.facilities.reduce((sum, element) => {
                return sum + element.amount
            }, 0)
            return {
                ...state,
                affordable: sum > 0
            }

        case actionTypes.RESET_FACILITIES:
            return {
                ...state,
                facilities: [
                    { type: 'seaViewBalcony', amount: 0 },
                    { type: 'swimingPool', amount: 0 },
                    { type: 'exoticSeaFoods', amount: 0 },
                    { type: 'candleLightDinner', amount: 0 },
                    { type: 'barbequePartyAtShore', amount: 0 }
                ],
                totalPrice: 2500,
                affordable: false
            }

        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key
                })
            }
            return {
                ...state,
                orders: orders,
                orderLoading: false
            }

        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderError: true,
                orderLoading: false
            }

        // Auth

        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                authMsgFailed: null,
                token: null,
                userId: null
            }

        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload
            }

        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authMsgFailed: action.payload
            }
        default:
            return state;
    }
}

