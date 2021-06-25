import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { addToCart, deleteOneFromCart, deleteFromCart } from "../actions";
import Navbar from "./Navbar";

const Cart = ({ cart, addToCart, deleteFromCart, deleteOneFromCart }) => {
    var total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += (cart[i]["price"] * cart[i]["quantity"])
    }

    console.log(cart);
    return (
        <div>
            <Navbar />
            <div className="container-fluid">

                <table className="table">
                    <tbody>
                        {cart.map((book) => {
                            return (
                                <Fragment key={book.bookID}>
                                    <tr>
                                        <td>{book.title}</td>
                                        <td>{book.price}</td>
                                        <td>SubTotal: {book.price * book.quantity}</td>
                                        <td><button onClick={() => deleteOneFromCart(book)}>-</button></td>
                                        <td>{book.quantity}</td>
                                        <td><button onClick={() => addToCart(book)}>+</button></td>
                                        <td><button onClick={() => deleteFromCart(book)}>Remove</button></td>
                                    </tr>

                                </Fragment>
                            )
                        })}
                    </tbody>
                </table>
                <div>Total : {total}</div>
                <NavLink className="btn btn-primary" to="/checkout" exact>Checkout</NavLink>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    };
};

export default connect(mapStateToProps, {
    addToCart: addToCart, deleteFromCart: deleteFromCart, deleteOneFromCart: deleteOneFromCart
})(Cart);
