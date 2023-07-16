import React from "react";

function Pagination(props) {
    return (
        <div className="d-flex justify-content-center align-items-baseline gap-2">
            <nav aria-label="Gift certificate pagination">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className={`page-link ${props.currentPage - 1 < 0 ? 'disabled' : ''}`} href={props.previousLink}>Previous</a>
                    </li>
                    <li className="page-item">
                        <a className={`page-link ${props.currentPage + 1 > props.maxPages ? 'disabled' : ''}`} href={props.nextLink}>Next</a>
                    </li>
                </ul>
            </nav>
            <p className="small">Page: {props.currentPage + 1} / {props.maxPages + 1}</p>
        </div>
    );
}

export default Pagination;