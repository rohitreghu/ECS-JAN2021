import { combineReducers } from "redux";

const cartReducer = (cart = [], action) => {
    const { payload } = action;
    switch (action.type) {
        case "ADD_TO_CART":
            var updationDoneAdd = false
            const cartAfterAdd = cart.map((book) => {
                if (book.title === payload.title) {
                    book.quantity += 1
                    updationDoneAdd = true;
                }
                return book
            })
            
            if (!updationDoneAdd){
                payload.quantity = 1
                return [...cart, payload]
            } else {
                return cartAfterAdd
            }
        case "DELETE_ONE_FROM_CART":
            var updationDoneDel = false;

            const cartAferDel = cart.map((book) => {
                if (book.title === payload.title){
                    if (book.quantity > 1) {
                        book.quantity -= 1;
                        updationDoneDel = true;
                    }
                }
                return book
            })

            if (!updationDoneDel){
                return cart.filter((book) => {
                    return book.title !== payload.title;
                })
            } else {
                return cartAferDel;
            }
            
        case "DELETE_FROM_CART":
            return cart.filter((book) => {
                return book.title !== payload.title;
            })
        case "EMPTY_CART":
            return []
        default:
            return cart;
    }
}

export default combineReducers({
    cart: cartReducer
});