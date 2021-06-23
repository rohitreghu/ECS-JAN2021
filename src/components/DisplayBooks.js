import React from "react";

const DisplayBooks = ({ displayedBooks }) => {
    return (
        displayedBooks.map((book) => {
            return (
                <tr key={book.bookID}>
                    <td>{book.title}</td>
                    <td>{book.authors}</td>
                    <td>{book.language_code}</td>
                    <td>{book.average_rating}</td>
                    <td>{book.price}</td>
                    <td><button>Add</button></td>
                </tr>
            );
        })
    );
}

export default DisplayBooks;