import React, {useEffect, useState} from "react";
import axios from "axios";
import CheckAuth from "../../../utils/CheckAuth";
import Pagination from "../../elements/Pagination";
import AdminGiftCertificate from "./AdminGiftCertificate";

function AdminGiftCertificates() {
    const giftCertificatesApiUrl = process.env.REACT_APP_API_URL + "/gift-certificates/filter";
    const giftCertificatesSizeUrl = process.env.REACT_APP_API_URL + "/gift-certificates/size";
    const [data, setData] = useState(null);
    const [giftCertificates, setGiftCertificates] = useState(null);
    const [size, setSize] = useState(0);
    const [token, setToken] = useState(getAuthToken);
    const [searchProperties, setSearchProperties] = useState(createSearchProperties());
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(createSearchName());
    const [selectedOption, setSelectedOption] = useState('5');

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

    function getAuthToken() {
        return localStorage.getItem("authToken");
    }

    function extractData(giftCertificatesData) {
        if (giftCertificatesData.hasOwnProperty("_embedded") &&
            giftCertificatesData._embedded.hasOwnProperty("giftCertificateList")) {
            return giftCertificatesData._embedded.giftCertificateList;
        }
        return [];
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

        setGiftCertificates(data.filter((element) => {
            return element.name.toLowerCase().includes(searchString);
        }));
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const fetchGiftCertificates = async () => {
        try {
            const response = await axios.get(giftCertificatesApiUrl, {params: searchProperties});
            if (response.status === 200) {
                const giftCertificatesData = await response.data;
                setData(extractData(giftCertificatesData));
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
                setSize(pagesResult);
            } else {
                throw new Error();
            }
        } catch (error) {
            setSize(Math.ceil(data.length / searchProperties.size));
        }
    };

    useEffect(() => {
        fetchGiftCertificates().then(() => {});
        fetchGiftCertificatesSize().then(() => {});
    }, []);

    useEffect(() => {
        setGiftCertificates(data);
    }, [data]);

    useEffect(() => {
        if (giftCertificates != null) {
            filterGiftCertificates(search);
        }
    }, [search])

    return (
        <>
            <CheckAuth/>
            <div className="container py-5 my-5">
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
                {(!error && giftCertificates !== null && data.length === 0) &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>No gift certificates are found yet(..</h2>
                            </div>
                        </div>
                    )
                }
                {(!error && giftCertificates !== null && data.length > 0) && (
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
                                    <a type="button" href="/admin/gift-certificates" className="btn btn-sm btn-outline-secondary m-2">
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
                                        value={`${search}`}
                                        onChange={(e) => setSearch(e.target.value)}
                                        aria-label="Search" name="search"/>
                                    <button className="btn btn-sm btn-outline-success w-25">
                                        <span className="me-1"><i className="bi bi-search"></i></span>
                                        <span>Search</span>
                                    </button>
                                </form>
                            </div>
                        </nav>
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Create date</th>
                                            <th scope="col">Last update date</th>
                                            <th scope="col">Tags</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="border-top-0">
                                        {giftCertificates.map(certificate => (
                                            <AdminGiftCertificate key={certificate.id} {...certificate}/>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <Pagination
                                maxPages={size}
                                currentPage={searchProperties.page}
                                nextLink={`/admin/gift-certificates?page=${searchProperties.page + 1}&size=${searchProperties.size}&search=${searchProperties.name}`}
                                previousLink={`/admin/gift-certificates?page=${searchProperties.page - 1}&size=${searchProperties.size}&search=${searchProperties.name}`}/>
                        </div>
                    </>

                )}
            </div>
        </>
    );
}

export default AdminGiftCertificates;