import React from "react";

const Pagination = ({ booksPerPage, totalBooks, currentPage, handlePrev, handleNext, paginate, rangeStart, rangeEnd }) => {
    const lastPage = Math.ceil(totalBooks / booksPerPage)
    const pageNumbers = [];

    //setting page number array only when total number of pages is less than 7, ie.e no need for ellipsis
    if (lastPage < 7) {
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(i)
        }
    }

    // When no books are present for the search result
    if (totalBooks === 0){
        return <div className="mx-auto">No Books Found</div>
    }

    return (
        <nav>
            {lastPage > 6 ? ( // case 1 is when total pages is greater than 6
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : null}`}>
                        <button onClick={handlePrev} className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li className="page-item">
                        <button onClick={() => paginate(1)} className={1 === currentPage ? `btn btn-dark` : 'page-link'} href="#">1</button>
                    </li>
                    <li className="page-item">
                        {currentPage < 5 ? (
                            <button className={2 === currentPage ? `btn btn-dark` : 'page-link'} onClick={() => paginate(2)}>2</button>
                        ) : (
                            <button onClick={handlePrev} className="page-link" href="#">
                                <span>...</span>
                            </button>
                        )}
                    </li>

                    <li className="page-item">
                        <button className={rangeStart === currentPage ? `btn btn-dark` : 'page-link'} onClick={() => paginate(rangeStart)}>{rangeStart}</button>
                    </li>
                    <li className="page-item">
                        <button className={rangeStart + 1 === currentPage ? `btn btn-dark` : 'page-link'} onClick={() => paginate(rangeStart + 1)}>{rangeStart + 1}</button>
                    </li>
                    <li className="page-item">
                        <button className={rangeEnd === currentPage ? `btn btn-dark` : 'page-link'} onClick={() => paginate(rangeEnd)}>{rangeEnd}</button>
                    </li>

                    <li className="page-item">
                        {currentPage > lastPage - 4 ? (
                            <button className={lastPage - 1 === currentPage ? `btn btn-dark` : 'page-link'} onClick={() => paginate(lastPage - 1)}>{lastPage - 1}</button>
                        ) : (
                            <button onClick={handleNext} className="page-link" href="#">
                                <span>...</span>
                            </button>
                        )}
                    </li>
                    <li className="page-item">
                        <button onClick={() => paginate(lastPage)} className={lastPage === currentPage ? `btn btn-dark` : 'page-link'} href="#">{lastPage}</button>
                    </li>
                    <li className={`page-item ${currentPage === lastPage ? 'disabled' : null}`}>
                        <button onClick={handleNext} className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            ) : ( // 2nd case for whn the total pages is less than 7
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : null}`}>
                        <button onClick={handlePrev} className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {pageNumbers.map((number) => {
                        return (
                            <li key={number} className="page-item">
                                <button className={number === currentPage ? "btn btn-dark" : "page-link"} onClick={() => paginate(number)} >{number}</button>
                            </li>
                        );
                    })}

                    <li className={`page-item ${currentPage === lastPage ? 'disabled' : null}`}>
                        <button onClick={handleNext} className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            )}

        </nav>
    );
};

export default Pagination;