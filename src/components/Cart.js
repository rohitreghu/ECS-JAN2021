import React, { Fragment, useRef } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { addToCart, deleteOneFromCart, deleteFromCart } from "../actions";
import Navbar from "./Navbar";

const Cart = ({ cart, addToCart, deleteFromCart, deleteOneFromCart }) => {
    const toast = useRef(null);

    var total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += (cart[i]["price"] * cart[i]["quantity"])
    }

    const onDelete = (book) => {
        deleteFromCart(book);
        toast.current.show({ severity: 'error', summary: 'Book Removed From Cart', life: 2000 });
    }

    console.log(cart);
    return (
        <div>
            <Navbar />
            <div className="container-fluid" style={{ padding: "1% 5%" }}>
                <Toast ref={toast} />
                <div className="d-flex justify-content-center">
                    <p className="display-4">Order Summary</p>
                </div>

                <div>
                    <table className="table">
                        <tbody>
                            {cart.map((book) => {
                                return (
                                    <Fragment key={book.bookID}>
                                        <tr className="row">
                                            <td className="col-6">
                                            <div className="bold"><strong>Book Title:</strong></div>
                                            <div>{book.title}</div>
                                            </td>
                                            <td className="col-2">
                                                <div className="d-flex justify-content-center">Price:&nbsp;₹&nbsp;{book.price}</div>
                                                <div className="d-flex justify-content-center">SubTotal&nbsp;:&nbsp;₹{book.price * book.quantity}</div>

                                            </td>
                                            {/* <td><button onClick={() => deleteOneFromCart(book)}>-</button></td> */}
                                            <td className="col-4 ">
                                                <div className="d-flex justify-content-center">
                                                    <button className="btn btn-primary btn-sm" onClick={() => deleteOneFromCart(book)}>-</button>
                                                    <span style={{ padding: "0 8%" }}>{book.quantity}</span>
                                                    <button className="btn btn-primary btn-sm" onClick={() => addToCart(book)}>+</button>
                                                </div>
                                                <div className="d-flex justify-content-center" style={{ padding: "4% 0 1% 0" }}>
                                                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(book)}><i className="far fa-trash-alt"></i></button>
                                                </div>
                                            </td>

                                        </tr>

                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                                
                <div className="row" style={{padding:"3% 0"}}>
                    <div className="col-2">
                        <h6 className="text-danger">*Shipping:&nbsp;FREE!</h6>
                    </div>
                    <div className="col-4 offset-6">
                        <h5 className="d-flex justify-content-center">Total:&nbsp;₹&nbsp;{total}</h5>
                        <div className="pt-2 d-flex justify-content-center"><NavLink className="btn btn-primary btn-lg" to="/checkout" exact>Checkout</NavLink></div>
                    </div>
                </div>

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
