import { connect } from "react-redux";
import { NavLink } from "react-router-dom";



const Navbar = ({ searchedTerm, setSearchedTerm, cart }) => {
    

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-5">

                <NavLink to="./home" exact className="navbar-brand" href="!#">BookKart</NavLink>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        <NavLink to="/about" exact className="nav-link" style={{marginLeft:"40%"}}>About</NavLink>
                        </li>
                    </ul>
                    {setSearchedTerm && (
                        <ul className="navbar-nav m-auto" style={{width:"70%"}}>
                            <input
                                className="form-control mr-sm-2"
                                type="search" placeholder="Search"
                                value={searchedTerm}
                                onChange={e => setSearchedTerm(e.target.value)}
                            />
                        </ul>
                    )}
                    <ul className="navbar-nav ml-auto">
                        
                        <NavLink to="/cart" exact className="nav-item active"><span className="nav-link p-0">
                            <i className="fas fa-shopping-cart fa-2x"></i>
                            <span className='badge badge-warning' id='lblCartCount'>{cart.length}</span>
                        </span></NavLink>
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