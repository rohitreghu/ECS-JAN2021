import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import {emptyCart} from "../actions"

const Checkout = ({ cart, emptyCart }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobNumber, setMobNumber] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [zip, setZip] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [mobNumberError, setMobNumberError] = useState("");
    const [stateError, setStateError] = useState("");
    const [cityError, setCityError] = useState("");
    const [zipError, setZipError] = useState("");

    const [submitClicked, setSubmitClicked] = useState(false);

    var total = 0;
    var quantity = 0;

    for (let i = 0; i < cart.length; i++) {
        quantity += cart[i]["quantity"];
        total += (cart[i]["quantity"] * cart[i]["price"])
    }

    const onInputChange = (event) => {
        const { id, value } = event.target;

        if (id === "name") {
            setName(value);
            if (value.length > 0 && value.length < 4) {
                setNameError("Name should have atleast 4 characters")
            } else {
                setNameError("");
            }
        } else if (id === "state") {
            setState(value);
            if (value.length > 0 && value.length < 4) {
                setStateError("State should have atleast 4 characters")
            } else {
                setStateError("");
            }
        } else if (id === "city") {
            setCity(value);
            if (value.length > 0 && value.length < 4) {
                setCityError("City should have atleast 4 characters")
            } else {
                setCityError("");
            }
        } else if (id === "email") {
            setEmail(value)
            if (!value.match(/(.+)@(.+){2,}\.(.+){2,}/) && value.length > 0) {
                setEmailError("Enter a valid email address");
            } else {
                setEmailError("");
            }
        } else if (id === "mobNumber") {
            setMobNumber(value);
            if (value.length !== 10 && value.length > 0) {
                setMobNumberError("Enter valid mobile number");
            } else {
                setMobNumberError("");
            }
        } else if (id === "zip") {
            setZip(value);
            if (value.length !== 6 && value.length!==0) {
                setZipError("Enter valid Zip Code")
            } else {
                setZipError("");
            }
        } else {
            setStreet(value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        window.alert("Order Successful");

        emptyCart();
        setSubmitClicked(true);
    }

    if (submitClicked){
        return <Redirect to={{pathname: "/home"}} />
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8 offset-2">
                        <form onSubmit={handleSubmit}>
                            <div className="card my-5">
                                <div className="card-body">
                                    <h5 className="card-title">Customer Details</h5>
                                    <div className="card-text">
                                        <div className="form-group">
                                            <label htmlFor="name">Name<span className="text-danger">*</span></label>
                                            <input
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                required
                                                value={name}
                                                onChange={onInputChange}
                                            />
                                            {nameError && <div className="alert alert-danger">{nameError}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email<span className="text-danger">*</span></label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                                required
                                                value={email}
                                                onChange={onInputChange}
                                            />
                                            {emailError && <div className="alert alert-danger">{emailError}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="mobNumber">Mobile Number<span className="text-danger">*</span></label>
                                            <input
                                                id="mobNumber"
                                                type="number"
                                                className="form-control"
                                                placeholder="Mobile Number"
                                                required
                                                value={mobNumber}
                                                onChange={onInputChange}
                                            />
                                            {mobNumberError && <div className="alert alert-danger">{mobNumberError}</div>}
                                        </div>
                                    </div>
                                    <hr/>

                                    <h5 className="card-title mt-4">Shipping Address</h5>
                                    <div className="card-text">
                                        <div className="form-group">
                                            <label htmlFor="country">Country<span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value="India"
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="state">State<span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                id="state"
                                                className="form-control"
                                                placeholder="State"
                                                required
                                                value={state}
                                                onChange={onInputChange}
                                            />
                                            {stateError && <div className="alert alert-danger">{stateError}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">City<span className="text-danger">*</span></label>
                                            <input
                                                id="city"
                                                type="text"
                                                className="form-control"
                                                placeholder="City"
                                                required
                                                value={city}
                                                onChange={onInputChange}
                                            />
                                            {cityError && <div className="alert alert-danger">{cityError}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="street">House No./Street</label>
                                            <input
                                                id="street"
                                                type="text"
                                                className="form-control"
                                                placeholder="House No./Street"
                                                value={street}
                                                onChange={onInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="zip">Zip Code<span className="text-danger">*</span></label>
                                            <input
                                                id="zip"
                                                type="number"
                                                className="form-control"
                                                placeholder="Zip Code"
                                                required
                                                value={zip}
                                                onChange={onInputChange}
                                            />
                                            {zipError && <div className="alert alert-danger">{zipError}</div>}
                                        </div>
                                    </div>
                                    <hr/>

                                    <h5 className="card-title mt-4">Order Details</h5>
                                    <div>Total Quantity: {quantity}</div>
                                    <div>Shipping: Free</div>
                                    <div>Total Price: {total}</div>
                                    <hr/>

                                    <div>
                                        <button
                                            disabled={nameError || emailError || mobNumberError || stateError || cityError || zipError ? true : false}
                                            type="submit"
                                            className="btn btn-primary btn-lg mt-2"
                                        >
                                            Confirm Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    };
};

export default connect(mapStateToProps, {emptyCart: emptyCart})(Checkout);