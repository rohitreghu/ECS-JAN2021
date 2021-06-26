import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";


import Navbar from "./Navbar";
import DisplayBooks from "./DisplayBooks";
import Pagination from "./Pagination";

const Home = ({ cart }) => {
    const [books, setBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState("");

    //states for pagenation
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [rangeEnd, setRangeEnd] = useState(5);
    const [rangeStart, setRangeStart] = useState(3);

    //states for sorting
    const [sortAscPrice, setSortAscPrice] = useState(null);
    const [sortAscRating, setSortAscRating] = useState(null);


    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const paginatedBooks = (displayedBooks.slice(indexOfFirstBook, indexOfLastBook))

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
        const lastPage = Math.ceil(displayedBooks.length / booksPerPage)
        window.scroll(0, 0);

        if (currentPage === 1) {
            setRangeStart(3);
            setRangeEnd(5);
        } else if (currentPage >= 4 && currentPage < lastPage - 2) {
            setRangeStart(currentPage - 1);
            setRangeEnd(currentPage + 1)
        } else if (currentPage === lastPage) {
            setRangeStart(lastPage - 4);
            setRangeEnd(lastPage - 2);
        }
    }, [currentPage, booksPerPage, displayedBooks]);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchedTerm) {
                setDisplayedBooks(books.filter((book) => {
                    if (typeof book.title === 'string') {
                        return book.title.toLocaleLowerCase().includes(searchedTerm.toLocaleLowerCase());
                    } else {
                        return toString(book.title).toLocaleLowerCase().includes(searchedTerm.toLocaleLowerCase());
                    }
                }));
            } else {
                setDisplayedBooks(books);
            }
            setCurrentPage(1);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [searchedTerm, books]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const lastPage = Math.ceil(displayedBooks.length / booksPerPage)
        if (pageNumber > 4 && pageNumber < lastPage - 2) {
            setRangeStart(pageNumber - 1);
            setRangeEnd(pageNumber + 1)
        } else if (pageNumber === lastPage) {
            setRangeStart(lastPage - 4);
            setRangeEnd(lastPage - 2);
        } else if (pageNumber === 1) {
            setRangeStart(3);
            setRangeEnd(5);
        }
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleSort = (event) => {
        const { id } = event.target;

        setCurrentPage(1);

        if (id === "price") {
            if (sortAscPrice) {
                setSortAscPrice(false);
                setDisplayedBooks(prevValue => prevValue.sort((a, b) => a.price - b.price));
            } else {
                setSortAscPrice(true);
                setDisplayedBooks(prevValue => prevValue.sort((a, b) => b.price - a.price));
            }
        } else {
            if (sortAscRating) {
                setSortAscRating(false);
                setDisplayedBooks(prevValue => prevValue.sort((a, b) => a.average_rating - b.average_rating));
            } else {
                setSortAscRating(true);
                setDisplayedBooks(prevValue => prevValue.sort((a, b) => b.average_rating - a.average_rating));
            }
        }
    }

    return (
        <div >
            <Navbar searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} />
            <div className="container-fluid" style={{ padding: "2% 5%" }}>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Language</th>
                                <th id="rating" scope="col" onClick={(e) => handleSort(e)} style={{ cursor: "pointer" }}>Rating</th>
                                <th id="price" scope="col" onClick={(e) => handleSort(e)} style={{ cursor: "pointer" }}>Price</th>
                                <th scope="col">Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <DisplayBooks displayedBooks={paginatedBooks} />
                        </tbody>
                    </table>
                </div>
                <Pagination
                    booksPerPage={booksPerPage}
                    totalBooks={displayedBooks.length}
                    currentPage={currentPage}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    paginate={paginate}
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Home);