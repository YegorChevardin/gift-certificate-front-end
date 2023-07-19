import React, {useEffect, useState} from "react";
import axios from "axios";

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

    useEffect(() => {

    });

    return (<></>);
}

export default AdminGiftCertificates;