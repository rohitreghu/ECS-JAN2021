import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import Navbar from "./Navbar";
import DisplayBooks from "./DisplayBooks";
import Pagination from "./Pagination";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const paginatedBooks = displayedBooks.slice(indexOfFirstBook, indexOfLastBook);

    const url = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json";

    useEffect(() => {
        const getBooks = async () => {
            const response = await axios.get(url);
            console.log(response.data);
            setBooks(response.data);
        }

        getBooks();
    }, []);

    useEffect(() => {
        setDisplayedBooks(books.slice(0,40));
    }, [books])

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage > 2 && currentPage < displayedBooks.length - 2) {
            setMaxPageNumberLimit(maxPageNumberLimit + 1)
            setMinPageNumberLimit(minPageNumberLimit + 1)
        }
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
        if (currentPage > 2 && currentPage < displayedBooks.length - 2) {
            setMaxPageNumberLimit(maxPageNumberLimit - 1)
            setMinPageNumberLimit(minPageNumberLimit - 1)
        }

    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div >
            <Navbar />
            <div className="container-fluid">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Language</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Price</th>
                            <th scope="col">Buy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DisplayBooks displayedBooks={paginatedBooks} />
                    </tbody>
                </table>
                <Pagination
                    booksPerPage={booksPerPage}
                    totalBooks={displayedBooks.length}
                    currentPage={currentPage}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    paginate={paginate}
                    maxPageNumberLimit={maxPageNumberLimit}
                    minPageNumberLimit={minPageNumberLimit}
                />
            </div>
        </div>
    );
}

export default Home;