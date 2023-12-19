import React from "react";

const reducer = (state, action) => {
    switch(action.type){
        case 'CLEAR_CART':
            return({
                ...state, cart:[]
            });
        case 'REMOVE_ITEM':
            return({
                ...state, cart: state.cart.filter((item) => item.id != action.payload)
            });
        case 'INCREASE_ITEM':
            const tempCart = state.cart.map((cartItem) => {
                if(cartItem.id === action.payload){
                    return({...cartItem, amount: cartItem.amount+1})
                }
                return cartItem
            });
            return({...state, cart: tempCart});
        case 'DECREASE_ITEM':
            const tempCartTwo = state.cart.map((cartItem) => {
                if(cartItem.id === action.payload){
                    return({...cartItem, amount: cartItem.amount - 1})
                }
                return cartItem
            }).filter((item => item.amount > 0)) 
            return({...state, cart: tempCartTwo})
        case 'TOTAL':
            let {total, amount} = state.cart.reduce((cartTotal, cartItem) => {
                const {price, amount} = cartItem;
                const itemTotal = price * amount;

                cartTotal.amount += amount;
                cartTotal.total += itemTotal;
                return cartTotal
            }, {
                total: 0,
                amount: 0
            })
            total = parseFloat(total.toFixed(2));
            return({...state, total, amount})
        case 'LOADING':
            return({...state, loading: true})
        case 'DISPLAY_ITEMS':
            return({...state, loading: false, cart: action.payload})
    }
    return state;
}

export default reducer;