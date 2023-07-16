import React, {useEffect, useRef, useState} from "react";
import Masonry from 'masonry-layout';
import GiftCertificate from "./GiftCertificate";

function GiftCertificates() {
    const giftCertificatesApiUrl = process.env.REACT_APP_API_URL + "/gift-certificates";
    const [giftCertificates, setGiftCertificates] = useState(null);
    const [error, setError] = useState(null);

    const masonryRef = useRef(null);

    useEffect(() => {
        const fetchGiftCertificates = async () => {
            try {
                const response = await fetch(giftCertificatesApiUrl);
                if (response.ok) {
                    const giftCertificatesData = await response.json();
                    setGiftCertificates(giftCertificatesData._embedded.giftCertificateList);
                } else {
                    throw new Error();
                }
            } catch (error) {
                setError("Something went wrong, try again later");
            }
        };

        fetchGiftCertificates().then(() => {
        });

        if (masonryRef.current) {
            new Masonry(masonryRef.current, {});
        }
    }, []);

    return (
        <div id="gift-certificates">
            <div className="container my-5">
                {error &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>{error}</h2>
                            </div>
                        </div>
                    )
                }
                {!error && !giftCertificates &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>Loading...</h2>
                            </div>
                        </div>
                    )
                }
                {(!error && giftCertificates !== null && giftCertificates.length === 0) &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>No gift certificates are found yet(..</h2>
                            </div>
                        </div>
                    )
                }
                {(!error && giftCertificates !== null && giftCertificates.length > 0) && (
                    <>
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <form id="gift-certificates-filter-form" method="get"
                                      className="d-flex flex-wrap align-items-center justify-content-between w-100">
                                    <div className="d-flex flex-nowrap mt-2 align-items-center justify-content-between">
                                        <select name="size" id="page-size-select" className="form-select-sm"
                                                aria-label="Page size">
                                            <option selected>5</option>
                                            <option>10</option>
                                            <option>20</option>
                                            <option>30</option>
                                        </select>
                                        <label htmlFor="page-size-select" className="form-label m-1">
                                            Page size
                                        </label>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input
                                            name="sort" className="form-check-input" type="radio"
                                            id="sortByName" value="projectName"/>
                                            <label className="form-check-label" htmlFor="sortByName">
                                                Sort by name
                                            </label>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input
                                            name="sort" className="form-check-input" type="radio"
                                            id="sortByPosts" value="projectPosts"/>
                                            <label className="form-check-label" htmlFor="sortByPosts">
                                                Sort by posts
                                            </label>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input" type="radio" name="sort"
                                            id="sortByCreationDate" value="projectCreateDate"/>
                                            <label className="form-check-label" htmlFor="sortByCreationDate">
                                                Sort by creation date
                                            </label>
                                    </div>
                                    <div className="form-check form-switch mt-2">
                                        <input
                                               className="form-check-input" type="checkbox" role="switch"
                                               id="orderSwitch" value="true"/>
                                            <label className="form-check-label" htmlFor="orderSwitch">Asc</label>
                                    </div>
                                    <button className="btn btn-sm btn-outline-primary m-2" type="submit">
                                        <span className="me-1"><i className="bi bi-funnel"></i></span>
                                        <span>Apply</span>
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary m-2">
                                        Reset
                                    </button>
                                </form>
                            </div>
                        </nav>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded rounded-4 mb-4">
                            <div className="container-fluid">
                                <form method="get" className="d-flex w-100"
                                      role="search">
                                    <input name="search"
                                           className="form-control me-2 flex-fill" type="search"
                                           placeholder="Search by name or link"
                                           aria-label="Search"/>
                                        <input
                                               className="form-control me-2 flex-fill" type="search"
                                               placeholder="Search by name or link"
                                               aria-label="Search"/>
                                            <button className="btn btn-sm btn-outline-success w-25" type="submit">
                                                <span className="me-1"><i className="bi bi-search"></i></span>
                                                <span>Search</span>
                                            </button>
                                </form>
                            </div>
                        </nav>
                        <div className="row" ref={masonryRef}>
                            {
                                giftCertificates.map(giftCertificate => (
                                    <div key={giftCertificate.id} className="col-sm-6 col-lg-4 mb-4">
                                        <GiftCertificate {...giftCertificate}/>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="d-flex justify-content-center align-content-center mt-5">
                            <nav aria-label="Gift Certificates pagination">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </>
                )
                }
            </div>
        </div>
    );
}

export default GiftCertificates;