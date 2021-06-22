import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import DisplayBooks from "./DisplayBooks";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);

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
                        <DisplayBooks displayedBooks={displayedBooks} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;