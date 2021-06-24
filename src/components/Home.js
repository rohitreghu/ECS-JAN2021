import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import DisplayBooks from "./DisplayBooks";
import Pagination from "./Pagination";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState("");

    //states for pagenation
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [rangeEnd, setRangeEnd] = useState(5);
    const [rangeStart, setRangeStart] = useState(3);

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
        setDisplayedBooks(books);
    }, [books])

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
            console.log("damn");
            setCurrentPage(1);
        }, 1000);

        return ()=> {
            clearTimeout(timeoutId);
        }
    }, [searchedTerm, books]);

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        const lastPage = Math.ceil(displayedBooks.length / booksPerPage)
        if (currentPage > 3 && currentPage < lastPage - 3) {
            setRangeStart(currentPage);
            setRangeEnd(currentPage + 2);
        }
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
        const lastPage = Math.ceil(displayedBooks.length / booksPerPage)
        if (currentPage > 4 && currentPage < lastPage - 2) {
            setRangeStart(currentPage - 2);
            setRangeEnd(currentPage);
        }
    }

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

    return (
        <div >
            <Navbar searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} />
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
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                />
            </div>
        </div>
    );
}

export default Home;