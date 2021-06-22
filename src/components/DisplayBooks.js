import React from "react";
import StarRatings from "react-star-ratings";

const DisplayBooks = ({ displayedBooks }) => {
    return (
        displayedBooks.map((book) => {
            return (
                <tr key={book.bookID}>
                    <td>{book.title}</td>
                    <td>{book.authors}</td>
                    <td>{book.language_code}</td>
                    <td>
                        <StarRatings
                            rating={parseFloat(book.average_rating)}
                            starRatedColor="#47ccde"
                            starDimension='15px'
                            starSpacing='0'
                        />
                        <h6><span className="badge badge-warning">{parseFloat(book.ratings_count)} ratings</span></h6>
                    </td>
                    <td>{book.price}</td>
                    <td><button>Add</button></td>
                </tr>
            );
        })
    );
}

export default DisplayBooks;