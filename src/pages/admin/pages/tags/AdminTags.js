import React, {useEffect, useState} from "react";
import CheckAuth from "../../../../utils/CheckAuth";
import axios from "axios";
import Tag from "../../../gift-certificates/tags/Tag";
import AdminGiftCertificate from "../gift-certificates/AdminGiftCertificate";
import Pagination from "../../../elements/Pagination";

function AdminTags() {
    const tagsUrl = process.env.REACT_APP_API_URL + "/tags/filter";
    const tagsSizeUrl = process.env.REACT_APP_API_URL + "/tags/size";
    const [data, setData] = useState(null);
    const [tags, setTags] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [size, setSize] = useState(0);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(null);
    const [sortParameters, setSortParameters] = useState(createSortParameters());

    function createSortParameters() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const page = urlParams.get("page");
        const size = urlParams.get("size");
        const tag_name = urlParams.get("tag_name");
        const tag_name_sort = urlParams.get("tag_name_sort");

        return {
            page: Number.isInteger(parseInt(page)) ? parseInt(page) : 0,
            size: Number.isInteger(parseInt(size)) ? parseInt(size) : 5,
            tag_name: tag_name,
            tag_name_sort: tag_name_sort === "asc" || tag_name_sort === "desc" ? tag_name_sort : "desc"
        };
    }

    function extractData(tags) {
        if (tags.hasOwnProperty("_embedded") &&
            tags._embedded.hasOwnProperty("tagsList")) {
            return tags._embedded.tagsList;
        }
        return [];
    }

    function filterTags(string) {
        const searchString = string.toLowerCase();

        setTags(data.filter((element) => {
            return element.name.toLowerCase().includes(searchString);
        }));
    }

    const handleSortFormSubmit = (event) => {
        //todo
    };

    const handleSortOrder = (event) => {
        //todo
    };

    const fetchTags = async () => {
        try {
            const response = await axios.get(tagsUrl, {
                headers: {
                    Authorization: authToken
                }
            });
            if (response.status === 200) {
                const tagsData = await response.data;
                setData(extractData(tagsData));
            } else {
                throw new Error();
            }
        } catch (error) {
            setError("Something went wrong, try again later");
        }
    };

    const fetchTagsSize = async () => {
        try {
            const response = await axios.get(tagsSizeUrl, {
                headers: {
                    Authorization: authToken
                }
            });
            if (response.status === 200) {
                const result = await response.data;
                const pagesResult = Math.ceil(result / sortParameters.size) - 1;
                setSize(pagesResult);
            } else {
                throw new Error();
            }
        } catch (error) {
            setSize(0);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token !== null && token !== undefined && token !== "") {
            setAuthToken(token);
        }
    }, []);

    useEffect(() => {
        setTags(data);
    }, [data]);

    useEffect(() => {
        if (tags != null) {
            filterTags(search);
        }
    }, [search]);

    useEffect(() => {
        fetchTags().then(() => {});
        fetchTagsSize().then(() => {});
    }, [authToken]);

    return (
        <>
            <CheckAuth/>
            <div className="container py-5 my-5">
                <div className="row justify-content-center align-items-center mb-2">
                    <div className="col-md-6">
                        <h3 className="text-center mb-1">Tags management console</h3>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center mb-4">
                    <div className="col-md-2 text-center">
                        <a href="/admin/tags" className="btn btn-sm w-100 btn-outline-primary">
                            <i className="bi bi-arrow-clockwise me-1"></i>Reload
                        </a>
                    </div>
                </div>
                {error &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>{error}</h2>
                            </div>
                        </div>
                    )
                }
                {!error && !tags &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>Loading...</h2>
                            </div>
                        </div>
                    )
                }
                {(!error && tags !== null && data.length === 0) &&
                    (
                        <div className="row justify-content-around align-content-center">
                            <div className="col-md-8 align-self-center text-center">
                                <h2>No tags are found yet(..</h2>
                            </div>
                        </div>
                    )
                }
                {(!error && tags !== null && data.length > 0) && (
                    <>
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <form id="gift-certificates-filter-form" method="get"
                                      className="d-flex flex-wrap align-items-baseline justify-content-around w-100">
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
                                    <div className="form-check form-switch">
                                        <input name="asc"
                                               className="form-check-input" type="checkbox" role="switch"
                                               id="orderSwitch" value="asc" checked={sortParameters.tag_name_sort === "asc"} onChange={handleSortOrder}/>
                                        <label className="form-check-label" htmlFor="orderSwitch">Asc/Desc by name</label>
                                    </div>
                                    <button className="btn btn-sm btn-outline-primary m-2" type="submit" onClick={handleSortFormSubmit}>
                                        <span className="me-1"><i className="bi bi-funnel"></i></span>
                                        <span>Apply</span>
                                    </button>
                                    <a type="button" href="/admin/gift-certificates"
                                       className="btn btn-sm btn-outline-secondary m-2">
                                        Reset
                                    </a>
                                    <button type="button" className="btn btn-sm btn-outline-primary">Add new item
                                    </button>
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
                            <div className="col-md-10">
                                <div id="tags">
                                    {tags && tags.map(element => (<Tag {...element}/>))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <Pagination
                                maxPages={size}
                                currentPage={sortParameters.page}
                                nextLink={`/admin/gift-certificates?page=${sortParameters.page + 1}&size=${sortParameters.size}&search=${sortParameters.name}`}
                                previousLink={`/admin/gift-certificates?page=${sortParameters.page - 1}&size=${sortParameters.size}&search=${sortParameters.name}`}/>
                        </div>
                    </>

                )}
            </div>
        </>
    );
}

export default AdminTags;