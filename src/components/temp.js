import React, { useEffect, useState } from 'react';
import Axios from "axios";

import StarRatings from 'react-star-ratings';
import ReactPaginate from 'react-paginate';


function Home() {

    const [bookList, setBookList] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    var currentPageData = null;

    useEffect(() => {
        const url = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json";

        Axios.get(url)
            .then((response) => {
                setBookList(response.data)

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])




    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);

    }



    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    if (bookList) {
        currentPageData = bookList
        .slice(offset, offset + PER_PAGE)
        .map((book, index) => {
            return <tr key={index}>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td><StarRatings
                    rating={parseFloat(book.average_rating)}
                    starRatedColor="#47ccde"
                    starDimension='15px'
                    starSpacing='0'
                />
                    <h6><span className="badge badge-warning">{parseFloat(book.ratings_count)} ratings</span></h6>
                </td>
                <td>{book.language_code}</td>
                <td>{book.price}</td>
            </tr>
        })
            
    }

    const pageCount = Math.ceil(bookList.length / PER_PAGE);

    function sortBy(key) {
        console.log(typeof key);

        setBookList(bookList.sort((a, b) => {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        }));
    }

    return <div className="mx-auto">
        <div className="table-responsive">
            <table className="table table-bordered table-sm">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">authors</th>
                        <th scope="col" onClick={() => sortBy("average_rating")}>average_rating</th>
                        <th scope="col">language_code</th>
                        <th scope="col">price</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData && currentPageData}
                </tbody>
            </table>
        </div>
        <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"active"}
        />
    </div>;
}

export default Home;