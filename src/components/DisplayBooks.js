import React, { useRef } from "react";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { addToCart } from "../actions";

const DisplayBooks = ({ displayedBooks, addToCart, cart }) => {
    const toast = useRef(null);

    const onAdd = (book) => {
        addToCart(book);
        toast.current.show({ severity: 'info', summary: 'Book Added to Cart', life: 2000 });
    }


    return (
        displayedBooks.map((book) => {
            return (
                <tr key={book.bookID}>
                    <td>{book.title}<Toast ref={toast} /></td>
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
                    <td ><span>₹&nbsp;{book.price}</span></td>
                    <td><button className="btn btn-primary" onClick={() => onAdd(book)}>Add</button></td>
                    
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