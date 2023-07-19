import React, {useEffect, useRef, useState} from "react";
import Masonry from 'masonry-layout';
import GiftCertificate from "./GiftCertificate";
import axios from 'axios';
import Pagination from "../elements/Pagination";
import giftCertificate from "./GiftCertificate";

function GiftCertificates() {
    const giftCertificatesApiUrl = process.env.REACT_APP_API_URL + "/gift-certificates/filter";
    const giftCertificatesSizeUrl = process.env.REACT_APP_API_URL + "/gift-certificates/size";
    const [searchProperties] = useState(createSearchProperties());
    const [selectedOption, setSelectedOption] = useState('5');
    const [giftCertificates, setGiftCertificates] = useState(null);
    const [maxPages, setMaxPages] = useState(0);
    const [filteredGiftCertificates, setFilteredGiftCertificates] = useState(null);
    const [error, setError] = useState(null);
    const [searchName, setSearchName] = useState(createSearchName);
    const masonryRef = useRef(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    function createSearchProperties() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const page = urlParams.get("page");
        const size = urlParams.get("size");
        const name = getSearchValueFromParams(urlParams);

        return {
            "page": Number.isInteger(parseInt(page)) ? parseInt(page) : 0,
            "size": Number.isInteger(parseInt(size)) ? parseInt(size) : 5,
            "name": name || ""
        };
    }

    function getSearchValueFromParams(urlParams) {
        return urlParams.get("search");
    }

    function createSearchName() {
        const urlParams = new URLSearchParams(window.location.search);
        return getSearchValueFromParams(urlParams) || "";
    }

    function filterGiftCertificates(string) {
        const searchString = string.toLowerCase();

        setFilteredGiftCertificates(giftCertificates.filter((element) => {
            return element.name.toLowerCase().includes(searchString);
        }));
    }

    function extractGiftCertificates(giftCertificatesData) {
        if (giftCertificatesData.hasOwnProperty("_embedded") &&
            giftCertificatesData._embedded.hasOwnProperty("giftCertificateList")) {
            return giftCertificatesData._embedded.giftCertificateList;
        }
        return [];
    }

    useEffect(() => {
        const fetchGiftCertificates = async () => {
            try {
                const response = await axios.get(giftCertificatesApiUrl, {params: searchProperties});
                if (response.status === 200) {
                    const giftCertificatesData = await response.data;
                    setGiftCertificates(extractGiftCertificates(giftCertificatesData));
                } else {
                    throw new Error();
                }
            } catch (error) {
                setError("Something went wrong, try again later");
            }
        };

        const fetchGiftCertificatesSize = async () => {
            try {
                const response = await axios.get(giftCertificatesSizeUrl);
                if (response.status === 200) {
                    const result = await response.data;
                    const pagesResult = Math.ceil(result / searchProperties.size) - 1;
                    setMaxPages(pagesResult);
                } else {
                    throw new Error();
                }
            } catch (error) {
                setMaxPages(Math.ceil(giftCertificate.length / searchProperties.size));
            }
        };

        fetchGiftCertificates().then(() => {
        });
        fetchGiftCertificatesSize().then(() => {
        });

        if (masonryRef.current) {
            new Masonry(masonryRef.current, {});
        }
    }, []);

    useEffect(() => {
        setFilteredGiftCertificates(giftCertificates);
    }, [giftCertificates]);

    useEffect(() => {
        if (giftCertificates != null) {
            filterGiftCertificates(searchName);
        }
    }, [searchName])

    return (
        <div id="gift-certificates">
            <div className="container mt-5 mb-3">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-2 text-center">
                        <a href="/gift-certificates" className="btn btn-sm w-100 btn-outline-primary">
                            <i className="bi bi-arrow-clockwise me-1"></i>Reload
                        </a>
                    </div>
                </div>
            </div>
            <div className="container mb-5">
                {error &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>{error}</h2>
                            </div>
                        </div>
                    )
                }
                {!error && !filteredGiftCertificates &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>Loading...</h2>
                            </div>
                        </div>
                    )
                }
                {(!error && filteredGiftCertificates !== null && giftCertificates.length === 0) &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>No gift certificates are found yet(..</h2>
                            </div>
                        </div>
                    )
                }
                {(!error && filteredGiftCertificates !== null && giftCertificates.length > 0) && (
                    <>
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <form id="gift-certificates-filter-form" method="get"
                                      className="d-flex flex-wrap align-items-baseline justify-content-start w-100">
                                    <div className="d-flex flex-nowrap mt-2 align-items-center justify-content-between">
                                        <select value={selectedOption} onChange={handleOptionChange} name="size"
                                                id="page-size-select" className="form-select-sm"
                                                aria-label="Page size">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                        </select>
                                        <label htmlFor="page-size-select" className="form-label m-1">
                                            Page size
                                        </label>
                                    </div>
                                    <button className="btn btn-sm btn-outline-primary m-2" type="submit">
                                        <span className="me-1"><i className="bi bi-funnel"></i></span>
                                        <span>Apply</span>
                                    </button>
                                    <a type="button" href="/gift-certificates" className="btn btn-sm btn-outline-secondary m-2">
                                        Reset
                                    </a>
                                </form>
                            </div>
                        </nav>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded rounded-4 mb-4">
                            <div className="container-fluid">
                                <form method="get" className="d-flex w-100"
                                      role="search">
                                    <input
                                        className="form-control me-2 flex-fill" type="search"
                                        placeholder="Search by name"
                                        value={searchName}
                                        onChange={(e) => setSearchName(e.target.value)}
                                        aria-label="Search" name="search"/>
                                    <button className="btn btn-sm btn-outline-success w-25">
                                        <span className="me-1"><i className="bi bi-search"></i></span>
                                        <span>Search</span>
                                    </button>
                                </form>
                            </div>
                        </nav>
                        <div className="row" ref={masonryRef}>
                            {
                                filteredGiftCertificates.map(giftCertificate => (
                                    <div key={giftCertificate.id} className="col-sm-6 col-lg-4 mb-4">
                                        <GiftCertificate {...giftCertificate}/>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="mt-5">
                            <Pagination
                                maxPages={maxPages}
                                currentPage={searchProperties.page}
                                nextLink={`/gift-certificates?page=${searchProperties.page + 1}&size=${searchProperties.size}&search=${searchProperties.name}`}
                                previousLink={`/gift-certificates?page=${searchProperties.page - 1}&size=${searchProperties.size}&search=${searchProperties.name}`}/>
                        </div>
                    </>
                )
                }
            </div>
        </div>
    );
}

export default GiftCertificates;