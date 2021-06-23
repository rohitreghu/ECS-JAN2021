import React from "react";

const Pagination = ({ booksPerPage, totalBooks, currentPage, handlePrev, handleNext, paginate, maxPageNumberLimit, minPageNumberLimit }) => {
    const pageNumbers = [];
    const lastPage = Math.ceil(totalBooks / booksPerPage)



    for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : null}`}>
                    <button onClick={handlePrev} className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {pageNumbers.map((number) => {
                    if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
                        return (
                            <li key={number} className="page-item">
                                <button className={number === currentPage ? `btn btn-dark` : 'page-link'} onClick={() => paginate(number)}>{number}</button>
                            </li>
                        );
                    } else {
                        return null;
                    }
                })}
                <li className={`page-item ${currentPage === lastPage ? 'disabled' : null}`}>
                    <button onClick={handleNext} className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;