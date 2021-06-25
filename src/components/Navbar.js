import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = ({ searchedTerm, setSearchedTerm, cart }) => {

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-5">

                <NavLink to="./home" exact className="navbar-brand" href="!#">Books</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {setSearchedTerm && (
                        <ul className="navbar-nav m-auto">
                        <input
                            className="form-control mr-sm-2"
                            type="search" placeholder="Search"
                            value={searchedTerm}
                            onChange={e => setSearchedTerm(e.target.value)}
                        />
                    </ul>
                    )}
                    <ul className="navbar-nav ml-auto">
                        <NavLink to="/cart" exact className="nav-item active"><span className="nav-link">Cart {cart.length}</span></NavLink>
                    </ul>
                </div>

            </nav>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Navbar);