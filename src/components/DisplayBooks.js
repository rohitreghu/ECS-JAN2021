import React from "react";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";

import { addToCart } from "../actions";

const DisplayBooks = ({ displayedBooks, addToCart, cart }) => {
    console.log(addToCart);
    console.log(cart);
    return (
        displayedBooks.map((book) => {
            return (
                <tr key={book.bookID}>
                    <td>{book.title}</td>
                    <td>{book.authors}</td>
                    <td>{book.language_code}</td>
                    <td>
                        <h6 className="badge">
                            <StarRatings
                                rating={typeof book.average_rating === "number" ? book.average_rating : 0}
                                starRatedColor="#47ccde"
                                starDimension='15px'
                                starSpacing='0'
                            />
                        </h6>

                        <h6><span className="badge badge-warning">{parseFloat(book.ratings_count)}</span></h6>
                    </td>
                    <td>{book.price}</td>
                    <td><button onClick={() => addToCart(book)}>Add</button></td>
                </tr>
            );
        })
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { addToCart: addToCart })(DisplayBooks);