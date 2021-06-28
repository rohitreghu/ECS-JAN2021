import { combineReducers } from "redux";

const initialCart = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : [] ;

const cartReducer = (cart = initialCart, action) => {
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
                sessionStorage.setItem("cart", JSON.stringify([...cart, payload]));
                return [...cart, payload]
            } else {
                sessionStorage.setItem("cart", JSON.stringify(cartAfterAdd));
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
                sessionStorage.setItem("cart", JSON.stringify(
                    cart.filter((book) => {
                        return book.title !== payload.title;
                    })
                ));
                return cart.filter((book) => {
                    return book.title !== payload.title;
                })
            } else {
                sessionStorage.setItem("cart", JSON.stringify(cartAferDel));
                return cartAferDel;
            }
            
        case "DELETE_FROM_CART":
            sessionStorage.setItem("cart", JSON.stringify(
                cart.filter((book) => {
                    return book.title !== payload.title;
                })
            ));
            return cart.filter((book) => {
                return book.title !== payload.title;
            })
        case "EMPTY_CART":
            sessionStorage.setItem("cart", JSON.stringify([]));
            return []
        default:
            sessionStorage.setItem("cart", JSON.stringify(cart));
            return cart;
    }
}

export default combineReducers({
    cart: cartReducer
});