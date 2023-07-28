import {Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Navbar() {
    const apiAuthPath = process.env.REACT_APP_API_URL + "/auth";
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    const checkToken = async (authToken) => {
        try {
            const response = await axios.get(apiAuthPath, {
                headers: {
                    Authorization: authToken
                }
            });
            if (response.status === 200) {
                if (response.data.hasOwnProperty("username")) {
                    setUsername(response.data.username);
                }
                setLoggedIn(true);
            } else {
                throw new Error();
            }
        } catch (error) {
            setLoggedIn(false);
        }
    };

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken !== null && authToken !== undefined && authToken !== "") {
            checkToken(authToken).then(r => {
            });
        }
    }, []);

    return (
        <div id="navbar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">Gift Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item me-3">
                                <Link className="nav-link" to="/gift-certificates">
                                    Gifts<i className="bi bi-gift-fill ms-1"></i>
                                </Link>
                            </li>
                            {isLoggedIn && (
                                <li className="nav-item me-3">
                                    <Link className="nav-link" to="/admin">
                                        Dashboard<i className="bi bi-speedometer ms-1"></i>
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item dropdown me-3">
                                <Link className="nav-link dropdown-toggle" to="#" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false">
                                    {username === null ? 'Account' : `${username}`}<i className="bi bi-person-fill ms-1"></i>
                                </Link>
                                <ul className="dropdown-menu rounded rounded-4">
                                    {
                                        !isLoggedIn && (
                                            <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                        )
                                    }
                                    {isLoggedIn && (
                                        <>
                                            <li>
                                                <Link className="dropdown-item" to="/account">
                                                    Account
                                                </Link>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                        </>
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}