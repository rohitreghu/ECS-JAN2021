import React from "react";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-5">

                <a className="navbar-brand" href="!#">Books</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active"><span className="nav-link">Cart</span></li>
                    </ul>
                </div>

            </nav>
        </div>
    );
}

export default Navbar;